import { Module } from '@nestjs/common';
import { BullModule } from "@nestjs/bull";
import { ServerConfig } from "../../collage/src/shared/config/ServerConfig";
import { CollageWorker } from "./CollageWorker";
import { CollageService } from "../../collage/src/modules/collage/CollageService";
import { UploadService } from "../../collage/src/modules/collage/UploadService";
import { PrismaModule } from "../../collage/src/shared/prisma/PrismaModule";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "collage",
      redis: {
        host: ServerConfig.REDIS_HOST,
        port: ServerConfig.REDIS_PORT,
        password: ServerConfig.REDIS_PASSWORD
      },
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [CollageWorker, CollageService, UploadService],
})
export class WorkerModule {}
