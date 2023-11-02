import { Injectable } from "@nestjs/common";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ServerConfig } from "../../shared/config/ServerConfig";
import { getSignedUrl as getS3SignedUrl } from "@aws-sdk/s3-request-presigner";


@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
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

  async uploadFile(file: Buffer, fileName: string): Promise<string> {
    await this.s3Client.send(new PutObjectCommand({
      Body: file,
      Bucket: ServerConfig.BUCKET_NAME,
      Key: fileName
    }));
    return await this.getSignedUrl(fileName);
  }

  private async getSignedUrl(fileName: string): Promise<string> {
    return await getS3SignedUrl(this.s3Client, new GetObjectCommand({
      Bucket: ServerConfig.BUCKET_NAME,
      Key: fileName
    }));
  }
}