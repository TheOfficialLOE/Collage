import { Injectable } from "@nestjs/common";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";
import { ServerConfig } from "../../shared/config/ServerConfig";
import { getSignedUrl as getS3SignedUrl } from "@aws-sdk/s3-request-presigner";
import * as moment from "moment";
import { s3Client } from "../../shared/util/s3Client";


@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucket = ServerConfig.BUCKET_NAME;

  constructor() {
    this.s3Client = s3Client;
  }

  async uploadFile(file: Buffer, fileName: string): Promise<string> {
    await this.s3Client.send(new PutObjectCommand({
      Body: file,
      Bucket: this.bucket,
      Key: fileName
    }));
    return await this.getSignedUrl(fileName);
  }

  async getFileBody(fileName: string) {
    const object = await this.s3Client.send(new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileName
    }));
    return object.Body.transformToByteArray();
  }

  async removeOldFiles() {
    let shouldContinue = true;
    let continuationToken: string;
    while (shouldContinue) {
      const { Contents: files, IsTruncated, NextContinuationToken } = await this.s3Client.send(new ListObjectsV2Command({
        Bucket: this.bucket,
        ContinuationToken: continuationToken
      }));
      const now = moment();
      for (const file of files) {
        const lastModified = moment(file.LastModified);
        const diff = now.diff(lastModified, "months");
        if (diff > 0)
          await this.deleteFile(file.Key);
      }
      shouldContinue = IsTruncated;
      continuationToken = NextContinuationToken;
    }
  }

  private async deleteFile(filename: string) {
    await this.s3Client.send(new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: filename
    }));
  }

  private async getSignedUrl(fileName: string): Promise<string> {
    return await getS3SignedUrl(this.s3Client, new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileName
    }));
  }
}