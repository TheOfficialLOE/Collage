import { Body, Controller, Get, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Protected } from "../../shared/decorators/ProtectedDecorator";
import { AuthRequestDTO } from "./AuthRequestDTO";
import { AuthService } from "./AuthService";
import { ExtractFieldFromToken } from "../../shared/decorators/ExtractFieldFromToken";


@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post("signup")
  async signup(@Body() body: AuthRequestDTO): Promise<string> {
    const user = await this.authService.createUserOrThrow(body);
    return await this.jwtService.signAsync({ id: user.id, username: user.username });
  }

  @Get("login")
  async login(@Body() body: AuthRequestDTO): Promise<string> {
    const user = await this.authService.loginUserOrThrow(body);
    return await this.jwtService.signAsync({ id: user.id, username: user.username });
  }

  @Get("verify")
  @Protected()
  async verify(@ExtractFieldFromToken("id") id: string) {
    return id + " has access";
  }
}