import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "../domain/user.entity";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async insertUser(user: Partial<User>) {
        const result: UserDocument = await this.userModel.create(user);
        return result.id;
    }

    async find(userId:string): Promise<UserDocument> {
        return this.userModel.findById(userId).exec();
    }

    async deleteUserById(userId:string){
        try {
            const result=await this.userModel.findOneAndDelete({_id:userId})
            return result.$isDeleted()
        }catch (error) {
            throw new Error(`Failed to delete blog with error ${error}`)
        }
    }
}
