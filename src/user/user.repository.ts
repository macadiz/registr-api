import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword, validateHash } from '../utils/crypto';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async validateUser(groupId: number, username: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        username,
        groupId,
      },
    });

    const isValid = user ? await validateHash(password, user.password) : false;

    return { isValid };
  }

  async createUser(
    groupId: number,
    name: string,
    username: string,
    password: string,
    email: string,
  ) {
    return this.prismaService.user.create({
      data: {
        email,
        username,
        password: await hashPassword(password),
        groupId,
        name,
      },
    });
  }
}
