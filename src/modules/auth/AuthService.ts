import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/PrismaService";
import { AuthDTO } from "./AuthDTO";
import * as bcrypt from "bcrypt";



@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async createUserOrThrow({ username, password }: AuthDTO) {
    // todo
    if (await this.findUser(username))
      throw "conflict";
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.prismaService.users.create({
      data: {
        username,
        password: hashedPassword
      }
    });
  }

  private async findUser(username) {
    return await this.prismaService.users.findUnique({
      where: {
        username: username
      }
    });
  }

  async loginUserOrThrow({ username, password }: AuthDTO) {
    const user = await this.findUser(username);
    //todo
    if (!user)
      throw "not found";
    const succeedInCompare = await bcrypt.compare(password, user.password);
    //todo
    if (!succeedInCompare)
      throw "wrong password";
    return true;
  }
}