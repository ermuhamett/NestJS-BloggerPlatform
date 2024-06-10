import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}

export const CommentLikesSchema = SchemaFactory.createForClass(CommentLikes);
export const PostLikesSchema = SchemaFactory.createForClass(PostLikes);
