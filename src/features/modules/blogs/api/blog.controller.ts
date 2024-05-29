import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {BlogService} from "../application/blog.service";
import {BlogCreateDto} from "./models/input/blog.input.model";
import {BlogQueryRepository} from "../infrastructure/blog.query.repository";
import {PostCreateDto} from "../../posts/api/models/input/post.input.model";
import {BlogRepository} from "../infrastructure/blog.repository";
import {PostService} from "../../posts/application/post.service";
import {PostQueryRepository} from "../../posts/infrastructure/post.query.repository";


@ApiTags('Blogs')
@Controller('blogs')
export class BlogController{
    constructor(private blogService:BlogService,
                private blogRepository:BlogRepository,
                private blogQueryRepository:BlogQueryRepository,
                private postService:PostService,
                private postQueryRepository:PostQueryRepository) {}

    ///TODO query репозиторий вернет ViewModel или OutputModel.
    // find нужно использовать внутри обычной репозиторий чтобы там получить hydrated document, то есть как промис вернется умный документ
    // entity можно добавить методы чтобы сразу создать или обновить их в сервисе, ну создать конечно неправильно будет но обновить это нормально
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createBlog(@Body() blogDto: BlogCreateDto){
        const blogId = await this.blogService.createBlog(blogDto)
        return await this.blogQueryRepository.getBlogById(blogId.toString())
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPostForBlog(@Param('blogId') blogId: string, @Body() postDto: PostCreateDto){
        const blog=await this.blogRepository.find(blogId)
        if (!blog) {
            throw new HttpException('Blog not found', HttpStatus.NOT_FOUND)
        }
        const createdPostId = await this.postService.createPost({...postDto, blogId}, blog.name)
        if (!createdPostId) {
            throw new HttpException('Some error when created post', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return await this.postQueryRepository.getPostById(createdPostId.toString())
    }

    @Put()
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateBlogById(@Param('id') id: string, @Body() blogDto: BlogCreateDto) {
        const blog = await this.blogRepository.find(id)
        if (!blog) {
            throw new HttpException('Blog not found', HttpStatus.NOT_FOUND)
        }
        const updatedBlog = await this.blogService.updateBlogById(id, blogDto)
        if (updatedBlog !== true) {
            throw new HttpException('Blog can not updated', HttpStatus.CONFLICT)
        }
    }

    @Get(':id')
    async getBlogById() {

    }

    @Get()
    async getBlogsWithPaging() {

    }

    @Get(':blogId/posts')
    async getPostsForBlog() {

    }

    @Delete(':id')
    async deleteBlogById() {

    }
}