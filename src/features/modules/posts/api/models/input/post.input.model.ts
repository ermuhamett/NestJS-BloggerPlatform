import { IsStringLength } from '../../../../../../common/decorators/validate/is-optional-email';
import { IsString } from 'class-validator';
import { LikeStatus } from '../../../../../likes/api/models/likes.info.model';

export class PostCreateDto {
  @IsStringLength(1, 30)
  title: string;

  @IsStringLength(1, 100)
  shortDescription: string;

  @IsStringLength(1, 1000)
  content: string;

  @IsString()
  blogId: string;
}

export class BlogPostCreateDto {
  @IsStringLength(1, 30)
  title: string;

  @IsStringLength(1, 100)
  shortDescription: string;

  @IsStringLength(1, 1000)
  content: string;
}

export class PostLikeDto {
  postId: string;
  userId: string;
  userLogin: string;
  //addedAt: string;
  status: LikeStatus;
}
