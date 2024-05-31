import {Injectable, NotFoundException} from "@nestjs/common";
import {BlogRepository} from "../infrastructure/blog.repository";
import {BlogCreateDto} from "../api/models/input/blog.input.model";
import {Blog, BlogDocument} from "../domain/blog.entity";
import {NotFoundError} from "rxjs";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";


@Injectable()
export class BlogService {
    constructor(private blogRepository: BlogRepository,
                @InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    }
    async createBlog(dto: BlogCreateDto) {
        const blog = new Blog(dto)//через конструктор класса
        const newBlogId = await this.blogRepository.insertBlog(blog)
        if (!newBlogId) {
            return {
                error: 'Ошибка при созданий блога'
            }
        }
        return newBlogId
    }

    async updateBlogById(blogId: string, blogDto: BlogCreateDto) {
        const existingBlog = await this.blogRepository.find(blogId)
        console.log('Before update:', existingBlog);
        existingBlog.updateBlog(blogDto)
        console.log('After update:', existingBlog);
        await existingBlog.save()
        //return await this.blogRepository.updateBlogById(blogId, blogDto)
    }

    async deleteBlogById(blogId: string) {
        return await this.blogRepository.deleteBlogById(blogId)
    }

    async save(blog: BlogDocument) {
        await blog.save()
    }
}