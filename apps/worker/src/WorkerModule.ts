import { Module } from '@nestjs/common';
import { BullModule } from "@nestjs/bull";
import { ServerConfig } from "../../collage/src/shared/config/ServerConfig";
import { CollageWorker } from "./CollageWorker";
import { PrismaModule } from "../../collage/src/shared/prisma/PrismaModule";
import { CollageModule } from "../../collage/src/modules/collage/CollageModule";

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
    CollageModule
  ],
  controllers: [],
  providers: [CollageWorker],
})
export class WorkerModule {}
