import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Создание вложенной схемы CommentatorSchema
@Schema({ _id: false })
export class CommentatorInfo {
  @Prop()
  userId: string;

  @Prop()
  userLogin: string;
}

export const CommentatorInfoSchema =
  SchemaFactory.createForClass(CommentatorInfo);

// Создание основной схемы CommentsSchema
@Schema()
export class Comment {
  @Prop()
  postId: string;

  @Prop()
  content: string;

  @Prop({ type: CommentatorInfoSchema })
  commentatorInfo: CommentatorInfo;

  @Prop({ type: String })
  createdAt: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.loadClass(Comment);
export type CommentDocument = HydratedDocument<Comment>;
