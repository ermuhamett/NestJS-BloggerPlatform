import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {BlogMapper, BlogOutputDto} from "../api/models/output/blog.output.model";
import {Blog, BlogDocument} from "../domain/blog.entity";



@Injectable()
export class BlogQueryRepository{
    constructor(@InjectModel(Blog.name) private blogModel:Model<BlogDocument>) {}

    async find(id:string): Promise<BlogOutputDto | Boolean>{
        try {
            return await this.blogModel.findById(id, {__v: false})
        }
        catch (e) {
            return false
        }
    }
    async getBlogById(blogId:string):Promise<BlogOutputDto | Boolean>{
        const blog=await this.blogModel.findOne({_id:blogId})
        if(!blog){
            throw new NotFoundException('Blog not found')
        }
        return BlogMapper.toView(blog)
    }
}