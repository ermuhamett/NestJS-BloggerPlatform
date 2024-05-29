import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Post, PostDocument} from "../domain/post.entity";
import {Model} from "mongoose";


@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private postModel:Model<PostDocument>) {}

    async insertPost(post:Post){
        const result:PostDocument=await this.postModel.create(post)
        return result.id
    }
}