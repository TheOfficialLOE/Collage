import { Module } from '@nestjs/common';
import { AuthModule } from "./modules/auth/AuthModule";
import { CollageModule } from "./modules/collage/CollageModule";
import { CronModule } from "./modules/cron/CronModule";

@Module({
  imports: [
    AuthModule,
    CollageModule,
    CronModule
  ],
})
export class AppModule {}
