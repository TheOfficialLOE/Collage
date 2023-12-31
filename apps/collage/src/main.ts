import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    new Logger().log("http://localhost:3000 ready!")
  });
}
bootstrap();
