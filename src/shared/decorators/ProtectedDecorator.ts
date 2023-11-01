import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/JwtAuthGuard";
import { IsAuthenticGuard } from "../guards/IsAuthenticGuard";

export const Protected = () => {
  return applyDecorators(
    SetMetadata,
    UseGuards(JwtAuthGuard, IsAuthenticGuard)
  )
}