import { Process, Processor } from "@nestjs/bull";
import { UploadService } from "../collage/UploadService";


@Processor("cron")
export class CronProcessor {
  constructor(
    private readonly uploadService: UploadService
  ) {}

  @Process()
  async cron() {
    await this.uploadService.removeOldFiles();
  }
}