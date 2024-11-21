import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LessonRepository } from './lesson.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LessonService {
  constructor(
    private lessonRepository: LessonRepository,
    private userRepository: UserService,
  ) {}

  async createLesson(userId: string, groupId: number, name: string) {
    const user = await this.userRepository.getUserById(userId, groupId);

    if (user.role === 'Teacher') {
      await this.lessonRepository.createLesson(userId, groupId, name);
    } else {
      throw new UnauthorizedException({
        message: 'Unauthorized',
      });
    }
  }

  async joinLesson(lessonId: string, userId: string, groupId: number) {
    const user = await this.userRepository.getUserById(userId, groupId);
    if (user.role === 'Student') {
      await this.lessonRepository.joinLesson(lessonId, userId, groupId);
    } else {
      throw new UnauthorizedException({
        message: 'Unauthorized',
      });
    }
  }

  async getLessonById(userId: string, lessonId: string, groupId: number) {
    return this.lessonRepository.getLessonById(userId, lessonId, groupId);
  }

  async getLessons(userId: string, groupId: number) {
    return this.lessonRepository.getLessons(userId, groupId);
  }
}
