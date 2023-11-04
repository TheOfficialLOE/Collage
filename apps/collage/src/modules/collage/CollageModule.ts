import { Module } from "@nestjs/common";
import { CollageController } from "./CollageController";
import { BullModule } from "@nestjs/bull";
import { ServerConfig } from "../../shared/config/ServerConfig";
import { PrismaModule } from "../../shared/prisma/PrismaModule";
import { CollageService } from "./CollageService";
import { UploadService } from "./UploadService";


@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: "collage",
      redis: {
        host: ServerConfig.REDIS_HOST,
        port: ServerConfig.REDIS_PORT,
        password: ServerConfig.REDIS_PASSWORD
      },
    }),
  ],
  controllers: [CollageController],
  providers: [CollageService, UploadService],
  exports: [CollageService, UploadService]
})
export class CollageModule {}