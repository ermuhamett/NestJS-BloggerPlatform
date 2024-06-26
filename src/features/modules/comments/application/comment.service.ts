import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../infrastructure/comment.repository';
import { Comment } from '../domain/comment.entity';
import {
  CommentLikeDb,
  LikeInputDto,
  LikeStatus,
} from '../../../likes/api/models/likes.info.model';
import { CommentLikes } from '../../../likes/domain/like.entity';

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

  async updateCommentLikeStatus(
    commentId: string,
    userId: string,
    payload: LikeInputDto,
  ) {
    const dto = new CommentLikes({
      authorId: userId,
      parentId: commentId,
      status: payload.likeStatus,
    });
    return await this.commentRepository.updateLikeStatus(dto);
  }
}
