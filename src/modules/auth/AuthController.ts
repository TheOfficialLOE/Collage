import { Body, Controller, Get, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Protected } from "../../shared/decorators/ProtectedDecorator";
import { AuthDTO } from "./AuthDTO";
import { AuthService } from "./AuthService";


@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post("signup")
  async signup(@Body() body: AuthDTO): Promise<string> {
    await this.authService.createUserOrThrow(body);
    return await this.jwtService.signAsync({ username: body.username });
  }

  @Get("login")
  async login(@Body() body: AuthDTO): Promise<string> {
    await this.authService.loginUserOrThrow(body);
    return await this.jwtService.signAsync({ username: body.username });
  }

  @Get("verify")
  @Protected()
  async verify() {
    return "has access";
  }
}