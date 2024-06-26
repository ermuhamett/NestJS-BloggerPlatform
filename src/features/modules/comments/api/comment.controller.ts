import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentQueryRepository } from '../infrastructure/comment.query.repository';
import { CommentCreateDto } from './models/input/comment.input.model';
import { AuthGuard } from '@nestjs/passport';
import { LikeInputDto } from '../../../likes/api/models/likes.info.model';
import { CommentExistenceGuard } from '../../../../common/guards/comment.existence.guard';
import { CommentService } from '../application/comment.service';

ApiTags('Comments');
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentQueryRepository: CommentQueryRepository,
    private readonly commentService: CommentService,
  ) {}
  @UseGuards(AuthGuard('jwt')) // Проверка токена должна быть первой
  @UseGuards(CommentExistenceGuard) // Затем проверяется существование комментария
  @Put(':commentId/like-status')
  async updateCommentLikeStatus(
    @Request() req,
    @Param('commentId') commentId: string,
    @Body() likeDto: LikeInputDto,
  ) {
    const likeUpdateResult = await this.commentService.updateCommentLikeStatus(
      commentId,
      req.user.userId,
      likeDto,
    );
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateCommentById(
    @Request() req,
    @Param('commentId') commentId: string,
    @Body() commentDto: CommentCreateDto,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Delete(':commentId')
  async deleteCommentById(@Param('commentId') commentId: string) {}
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getCommentById(@Param(':id') id: string) {
    return await this.commentQueryRepository.getCommentById(id);
  }
}
