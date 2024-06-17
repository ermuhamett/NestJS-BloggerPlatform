import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PostLikeDto } from '../../modules/posts/api/models/input/post.input.model';

export type CommentLikesDocument = HydratedDocument<CommentLikes>;
export type PostLikesDocument = HydratedDocument<PostLikes>;

@Schema()
export class CommentLikes {
  @Prop()
  authorId: string;

  @Prop()
  parentId: string;

  @Prop()
  status: string;

  @Prop()
  createdAt: string;
}

@Schema()
export class PostLikes {

  @Prop()
  postId: string;

  @Prop()
  likedUserId: string;

  @Prop()
  likedUserLogin: string;

  @Prop()
  addedAt: string;

  @Prop()
  status: string;

  constructor(dto: PostLikeDto) {
    this.postId = dto.postId;
    this.likedUserId = dto.userId;
    this.likedUserLogin = dto.userLogin;
    this.addedAt = new Date().toISOString();
    this.status = dto.status;
  }
}

export const CommentLikesSchema = SchemaFactory.createForClass(CommentLikes);
CommentLikesSchema.loadClass(CommentLikes);
export const PostLikesSchema = SchemaFactory.createForClass(PostLikes);
PostLikesSchema.loadClass(PostLikes);
