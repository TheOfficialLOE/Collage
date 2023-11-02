import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { IJobPayload } from "./IJobPayload";
import * as sharp from "sharp";
import * as path from "path";
import joinImages from 'join-images';
import { CollageService } from "./CollageService";
import { UploadService } from "./UploadService";
import { generateRandomString } from "../../shared/util/generateRandomString";

@Processor("collage")
export class CollageJobProcessor {
  constructor(
    private readonly collageService: CollageService,
    private readonly uploadService: UploadService,
  ) {}

  @Process({ concurrency: 1 })
  async process({ data }: Job<IJobPayload>) {
    const resizedImageBuffers: Buffer[] = [];
    for (const imagePath of data.images) {
      const resizedImage = await sharp(path.resolve(imagePath))
        .resize(150, 150).toBuffer();
      resizedImageBuffers.push(resizedImage);
    }
    const collage = await joinImages(resizedImageBuffers, {
      direction: data.properties.direction === "HORIZONTAL" ? "horizontal" : "vertical",
      offset: data.properties.border,
      margin: data.properties.border, color:
      data.properties.color
    });
    const collageUrl = await this.uploadService.uploadFile(await collage.png().toBuffer(), data.properties.requestId + "-" + generateRandomString() + ".png");
    await this.collageService.markRequestDone(data.properties.requestId, collageUrl)
  }

  @OnQueueFailed()
  async handleError({ data }: Job<IJobPayload>, error: Error) {
    console.log(error);
    await this.collageService.markRequestFailed(data.properties.requestId);
  }
}