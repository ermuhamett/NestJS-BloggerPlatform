import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../infrastructure/comment.repository';
import { Comment } from '../domain/comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(
    content: string,
    commentatorInfo: { id: string; login: string },
    postId: string,
  ) {
    const dto = {
      content,
      commentatorInfo: {
        userId: commentatorInfo.id,
        userLogin: commentatorInfo.login,
      },
      postId,
    };
    const newComment = new Comment(dto);
    return await this.commentRepository.createComment(newComment);
  }
}
