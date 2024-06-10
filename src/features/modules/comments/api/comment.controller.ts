import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CommentQueryRepository } from '../infrastructure/comment.query.repository';

ApiTags('Comments');
@Controller('comments')
export class CommentController {
  constructor(private commentQueryRepository: CommentQueryRepository) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getCommentById(@Param(':id') id: string) {
    return await this.commentQueryRepository.getCommentById(id);
  }
}
