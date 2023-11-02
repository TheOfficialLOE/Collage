import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { CollageService } from "./CollageService";
import { CreateCollageRequestDTO } from "./CreateCollageRequestDTO";
import { ExtractFieldFromToken } from "../../shared/decorators/ExtractFieldFromToken";
import { Protected } from "../../shared/decorators/ProtectedDecorator";
import { IJobPayload } from "./IJobPayload";
import { diskStorage } from "multer";
import * as path from "path";
import { generateRandomString } from "../../shared/util/generateRandomString";

@Controller("collage")
export class CollageController {
  constructor(
    @InjectQueue("collage") private readonly collageQueue: Queue<IJobPayload>,
    private readonly collageService: CollageService
  ) {}

  @Post()
  @Protected()
  @UseInterceptors(FilesInterceptor("images", 3, {
    storage: diskStorage({
      destination: "tmp",
      filename: (req, file, callback) => {
        const { name: filename, ext: extname } = path.parse(path.basename(file.originalname));
        const randomName = generateRandomString();
        callback(null,  filename + "-" + randomName + extname)
      }
    }),
  }))
  async requestCollage(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @ExtractFieldFromToken("id") userId: string,
    @Body() body: CreateCollageRequestDTO
  ) {
    if (images.length !== 3)
      throw "you need to upload 3 images"


    const { id: requestId } = await this.collageService.createCollageRequest({
      userId,
      ...body
    });

    await this.collageQueue.add({
      images: images.map(image => image.path),
      properties: {
        requestId,
        ...body,
      }
    });
    return "started the process"
  }
}