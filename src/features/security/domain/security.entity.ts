import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Session {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  deviceName: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  createdAt: number;

  @Prop({ required: true })
  expirationDate: number;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
SessionSchema.loadClass(Session);
export type SessionDocument = HydratedDocument<Session>;
