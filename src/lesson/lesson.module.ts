import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LessonRepository } from './lesson.repository';
import { LessonService } from './lesson.service';
import { UserModule } from 'src/user/user.module';
import { LessonController } from './lesson.controller';

@Module({
  imports: [UserModule],
  controllers: [LessonController],
  providers: [PrismaService, LessonRepository, LessonService],
})
export class LessonModule {}
