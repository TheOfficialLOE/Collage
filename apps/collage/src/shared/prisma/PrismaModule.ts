import { Module } from "@nestjs/common";
import { PrismaService } from "./PrismaService";


@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}