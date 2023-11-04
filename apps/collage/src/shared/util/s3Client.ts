import { S3Client } from "@aws-sdk/client-s3";
import { ServerConfig } from "../config/ServerConfig";

export const s3Client = new S3Client({
  region: "default",
  endpoint: ServerConfig.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: ServerConfig.BUCKET_ACCESS_KEY,
    secretAccessKey: ServerConfig.BUCKET_SECRET_KEY
  }
});