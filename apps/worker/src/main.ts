import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './WorkerModule';

async function bootstrap() {
  await NestFactory.createApplicationContext(WorkerModule);
}
bootstrap();
