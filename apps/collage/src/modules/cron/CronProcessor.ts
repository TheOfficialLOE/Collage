import { Process, Processor } from "@nestjs/bull";
import { UploadService } from "../collage/UploadService";
import * as fs from "fs/promises";


@Processor("cron")
export class CronProcessor {
  constructor(
    private readonly uploadService: UploadService
  ) {}

  @Process()
  async cron() {
    await this.uploadService.removeOldFiles();
    await fs.rm("/tmp");
  }
}