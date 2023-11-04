import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { CollageService } from "../../collage/src/modules/collage/CollageService";
import { UploadService } from "../../collage/src/modules/collage/UploadService";
import { Job } from "bull";
import { IJobPayload } from "../../collage/src/modules/collage/IJobPayload";
import * as sharp from "sharp";
import * as path from "path";
import joinImages from "join-images";
import { generateRandomString } from "../../collage/src/shared/util/generateRandomString";


@Processor("collage")
export class CollageWorker {
  constructor(
    private readonly collageService: CollageService,
    private readonly uploadService: UploadService,
  ) {}

  @Process()
  async process({ data }: Job<IJobPayload>) {
    const resizedImageBuffers: Buffer[] = [];
    for (const imagePath of data.images) {
      const resizedImage = await sharp(await this.uploadService.getFileBody(imagePath))
        .resize(150, 150).toBuffer();
      resizedImageBuffers.push(resizedImage);
    }
    const collage = await joinImages(resizedImageBuffers, {
      direction: data.properties.direction === "HORIZONTAL" ? "horizontal" : "vertical",
      offset: data.properties.border,
      margin: data.properties.border, color:
      data.properties.color
    });
    const collageUrl = await this.uploadService.uploadFile(await collage.png().toBuffer(), "collage/" + data.properties.requestId + "-" + generateRandomString() + ".png");
    await this.collageService.markRequestDone(data.properties.requestId, collageUrl)
  }

  @OnQueueFailed()
  async handleError({ data }: Job<IJobPayload>, error: Error) {
    await this.collageService.markRequestFailed(data.properties.requestId);
  }
}