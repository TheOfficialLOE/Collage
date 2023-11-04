import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { PrismaService } from "../../collage/src/shared/prisma/PrismaService";

async function bootstrap() {
  await NestFactory.createApplicationContext(WorkerModule);
}
bootstrap();
