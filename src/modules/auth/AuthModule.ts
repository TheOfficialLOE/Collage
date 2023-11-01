import { Module } from "@nestjs/common";
import { AuthController } from "./AuthController";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../../shared/strategy/JwtStrategy";
import { AuthService } from "./AuthService";
import { PrismaModule } from "../../shared/prisma/PrismaModule";


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "secret"
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