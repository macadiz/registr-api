import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword, validateHash } from '../utils/crypto';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async validateUser(groupId: number, username: string, password: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          username,
          groupId,
        },
      });

      const isValid = user
        ? await validateHash(password, user.password)
        : false;

      return { isValid, id: user?.id };
    } catch (e) {
      return { isValid: false, error: e.message };
    }
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

  async getUserById(userId: string, groupId: number) {
    return this.prismaService.user.findFirst({
      where: {
        id: userId,
        groupId,
      },
      select: {
        email: true,
        id: true,
        name: true,
        role: true,
      },
    });
  }
}
