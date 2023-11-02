import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from "./modules/auth/AuthModule";
import { CollageModule } from "./modules/collage/CollageModule";

@Module({
  imports: [AuthModule, CollageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
