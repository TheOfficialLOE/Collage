import { Injectable } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ServerConfig } from "../../shared/config/ServerConfig";


@Injectable()
export class UploadService {
  private s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({
      region: "default",
      endpoint: ServerConfig.BUCKET_ENDPOINT,
      credentials: {
        accessKeyId: ServerConfig.BUCKET_ACCESS_KEY,
        secretAccessKey: ServerConfig.BUCKET_SECRET_KEY
      }
    });
  }

  async uploadFile(file: Buffer, fileName) {
    await this.s3Client.send(new PutObjectCommand({
      Body: file,
      Bucket: ServerConfig.BUCKET_NAME,
      Key: fileName
    }))
  }
}