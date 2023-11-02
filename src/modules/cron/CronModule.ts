import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { ServerConfig } from "../../shared/config/ServerConfig";
import { CronProcessor } from "./CronProcessor";
import { CronService } from "./CronService";
import { UploadService } from "../collage/UploadService";


@Module({
  imports: [
    BullModule.registerQueue({
      name: "cron",
      redis: {
        host: ServerConfig.REDIS_HOST,
        port: ServerConfig.REDIS_PORT,
        password: ServerConfig.REDIS_PASSWORD
      },
    })
  ],
  controllers: [],
  providers: [CronProcessor, CronService, UploadService]
})
export class CronModule {

}