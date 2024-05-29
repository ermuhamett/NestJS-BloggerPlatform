import {Injectable} from "@nestjs/common";
import {PostRepository} from "../infrastructure/post.repository";
import {PostCreateDto} from "../api/models/input/post.input.model";
import {Post} from "../domain/post.entity";
import {BlogQueryRepository} from "../../blogs/infrastructure/blog.query.repository";



@Injectable()
export class PostService{
    constructor(private postRepository:PostRepository,
                private blogQueryRepository:BlogQueryRepository) {}

    async createPost(postDto:PostCreateDto, blogName:string){
        const post:Post={
            title:postDto.title,
            shortDescription:postDto.shortDescription,
            content:postDto.content,
            blogId:postDto.blogId,
            blogName:blogName,
            createdAt:new Date().toISOString()
        }
        const newPostId=await this.postRepository.insertPost(post)
        if(!newPostId){
            return {
                error:'Ошибка при созданий поста'
            }
        }
        return newPostId
    }
}