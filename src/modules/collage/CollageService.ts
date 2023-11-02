import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/PrismaService";
import { CreateCollageRequestDTO } from "./CreateCollageRequestDTO";


@Injectable()
export class CollageService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async createCollageRequest(payload: CreateCollageRequestDTO & { userId: string }) {
    return await this.prismaService.collage.create({
      data: {
        userId: payload.userId,
        direction: payload.direction,
        border: +payload.border,
        color: payload.color
      }
    });
  }

  async changeRequestStatus(requestId: string, status: "PENDING" | "ERROR" | "DONE") {
    await this.prismaService.collage.update({
      where: {
        id: requestId
      },
      data: {
        status
      }
    });
  }
}