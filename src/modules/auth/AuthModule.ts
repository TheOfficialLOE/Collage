import { Module } from "@nestjs/common";
import { AuthController } from "./AuthController";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../../shared/strategy/JwtStrategy";
import { AuthService } from "./AuthService";
import { PrismaModule } from "../../shared/prisma/PrismaModule";
import { ServerConfig } from "../../shared/config/ServerConfig";


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: ServerConfig.ACCESS_TOKEN_SECRET
    }),
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
  ]
})
export class AuthModule {}