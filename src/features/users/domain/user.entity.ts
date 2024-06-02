import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {randomUUID} from 'crypto';
import {UserCreateDto} from "../api/models/input/create-user.input.model";


@Schema()
export class User {
    @Prop()
    login: string;

    @Prop()
    email: string;

    @Prop()
    passwordHash: string;

    @Prop()
    createdAt: string;

    constructor(data: UserCreateDto, passwordHash: string) {
        this.login = data.login
        this.email = data.email
        this.passwordHash = passwordHash
        this.createdAt = new Date().toISOString()
    }

    //TODO: replace with new this()
    /*static create(name: string, email: string | null ) {
      const user = new this();

      user.name = name;
      user.email = email ?? `${randomUUID()}_${name}@it-incubator.io`;

      return user;
    }*/
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User)
export type UserDocument = HydratedDocument<User>;
