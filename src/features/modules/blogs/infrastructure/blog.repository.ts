import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {Blog, BlogDocument} from "../domain/blog.entity";
import {BlogCreateDto} from "../api/models/input/blog.input.model";

@Injectable()
export class BlogRepository{
    constructor(@InjectModel(Blog.name) private blogModel:Model<BlogDocument>) {}

    async insertBlog(blog:Blog){
        const result:BlogDocument=await this.blogModel.create(blog)
        return result.id
    }
    async updateBlogById(blogId:string, blogDto:BlogCreateDto){
        try {
            const result=await this.blogModel.findOneAndUpdate({_id:new Types.ObjectId(blogId)}, {$set:blogDto})
            return result.isModified()
        }catch (error) {
            throw new Error(`Failed to update post with error ${error}`)
        }
    }
    async find(blogId:string): Promise<BlogDocument> {
        return this.blogModel.findById(blogId)
    }
}