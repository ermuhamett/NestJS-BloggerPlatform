import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../domain/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async insertUser(user: Partial<User>) {
    const result: UserDocument = await this.userModel.create(user);
    return result.id;
  }

  async find(userId: string): Promise<UserDocument> {
    return this.userModel.findById(userId).exec();
  }

  async findUserByConfirmationCode(
    confirmationCode: string,
  ): Promise<UserDocument> {
    return await this.userModel
      .findOne({ 'emailConfirmation.confirmationCode': confirmationCode })
      .exec();
  }
  async findUserByRecoveryCode(recoveryCode: string): Promise<UserDocument> {
    return await this.userModel
      .findOne({ 'emailConfirmation.passwordRecoveryCode': recoveryCode })
      .exec();
  }
  async findByLoginOrEmail(loginOrEmail: string): Promise<UserDocument> {
    try {
      return await this.userModel.findOne({
        $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
      });
    } catch (e) {
      console.error('Error finding user by login or email:', e);
      return null;
    }
  }

  async deleteUserById(userId: string) {
    try {
      const result = await this.userModel.findOneAndDelete({ _id: userId });
      return result.$isDeleted();
    } catch (error) {
      throw new Error(`Failed to delete blog with error ${error}`);
    }
  }
}
