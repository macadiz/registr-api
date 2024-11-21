import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post('create')
  async createLesson(@Body() body) {
    await this.lessonService.createLesson(body.userId, body.groupId, body.name);
  }

  @Post('join')
  async joinLesson(@Body() body) {
    await this.lessonService.joinLesson(
      body.lessonId,
      body.userId,
      body.groupId,
    );
  }

  @Get('/:id')
  async getLessonInfo(
    @Param('id') lessonId: string,
    @Headers() headers: Record<string, string>,
  ) {
    return await this.lessonService.getLessonById(
      headers.userId,
      lessonId,
      Number(headers['group-id']),
    );
  }

  @Get('/')
  async getLessons(@Headers() headers: Record<string, string>) {
    return await this.lessonService.getLessons(
      headers['user-id'],
      Number(headers['group-id']),
    );
  }
}
