import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonRepository {
  constructor(private prisma: PrismaService) {}

  async createLesson(userId: string, groupId: number, name: string) {
    await this.prisma.lesson.create({
      data: {
        name,
        group: {
          connect: {
            id: groupId,
          },
        },
        teacher: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async joinLesson(lessonId: string, userId: string, groupId: number) {
    await this.prisma.lessonStudent.create({
      data: {
        group: {
          connect: {
            id: groupId,
          },
        },
        student: {
          connect: {
            id: userId,
          },
        },
        lesson: {
          connect: {
            id: lessonId,
          },
        },
      },
    });
  }

  async getLessonById(userId: string, lessonId: string, groupId: number) {
    return this.prisma.lesson.findFirst({
      include: {
        lessonStudent: true,
      },
      where: {
        groupId,
        id: lessonId,
        OR: [
          {
            teacherId: userId,
          },
          {
            lessonStudent: {
              some: {
                userId,
              },
            },
          },
        ],
      },
    });
  }

  async getLessons(userId: string, groupId: number) {
    return this.prisma.lesson.findMany({
      include: {
        lessonStudent: true,
      },
      where: {
        groupId,
        OR: [
          {
            teacherId: userId,
          },
          {
            lessonStudent: {
              some: {
                userId,
              },
            },
          },
        ],
      },
    });
  }
}
