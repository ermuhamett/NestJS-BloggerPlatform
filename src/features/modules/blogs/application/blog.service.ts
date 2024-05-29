import {Injectable} from "@nestjs/common";
import {BlogRepository} from "../infrastructure/blog.repository";
import {BlogCreateDto} from "../api/models/input/blog.input.model";
import {Blog, BlogDocument} from "../domain/blog.entity";


@Injectable()
export class BlogService{
    constructor(private blogRepository:BlogRepository,
                /* @InjectModel(Blog.name) private blogModel:Model<BlogDocument>*/) {}
    async createBlog(dto:BlogCreateDto){
        const blog:Blog={
            name:dto.name,
            description:dto.description,
            websiteUrl:dto.websiteUrl,
            createdAt:new Date().toISOString(),
            isMembership:true
        }
        //const newBlog = new this.blogModel(blog)

        //this.blogRepository.save(newBlog)

        const newBlogId=await this.blogRepository.insertBlog(blog)
        if(!newBlogId){
            return {
                error:'Ошибка при созданий блога'
            }
        }
        return newBlogId
    }
    async updateBlogById(blogId:string, blogDto:BlogCreateDto){
        /*const blog this.blogRepository.find(blogId)

        if(!blog) throw new NotFoundException()

        blog.updateBlog({name})
        this.blogRepository.save()*/
        return await this.blogRepository.updateBlogById(blogId, blogDto)
    }

    async save(blog: BlogDocument) {
        await blog.save()
    }
}