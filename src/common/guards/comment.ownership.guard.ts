import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CommentRepository } from '../../features/modules/comments/infrastructure/comment.repository';

@Injectable()
export class CommentOwnershipGuard implements CanActivate {
  constructor(private readonly commentRepository: CommentRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;
    const comment = request.comment;
    if (comment.commentatorInfo.userId !== userId.toString()) {
      throw new ForbiddenException();
    }
    return true;
  }
}
