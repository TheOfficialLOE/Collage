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

  async markRequestDone(requestId: string, collageUrl: string) {
    await this.prismaService.collage.update({
      where: {
        id: requestId
      },
      data: {
        status: "DONE",
        collageUrl,
        completedAt: new Date()
      }
    });
  }

  async markRequestFailed(requestId: string) {
    await this.prismaService.collage.update({
      where: {
        id: requestId
      },
      data: {
        status: "FAILED",
        completedAt: new Date()
      }
    });
  }

  async getAllRequests(userId: string) {
    return await this.prismaService.collage.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        requestedAt: true,
        status: true,
        collageUrl: true,
        completedAt: true,
      },
      orderBy: {
        requestedAt: "desc"
      }
    });
  }

  async getRequestById(requestId: string) {
    return await this.prismaService.collage.findUnique({
      where: {
        id: requestId
      },
      select: {
        id: true,
        requestedAt: true,
        status: true,
        collageUrl: true,
        completedAt: true,
      }
    });
  }
}