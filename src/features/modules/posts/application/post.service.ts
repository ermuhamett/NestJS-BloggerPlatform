import {Injectable, NotFoundException} from "@nestjs/common";
import {PostRepository} from "../infrastructure/post.repository";
import {PostCreateDto} from "../api/models/input/post.input.model";
import {Post} from "../domain/post.entity";
import {BlogQueryRepository} from "../../blogs/infrastructure/blog.query.repository";
import {BlogRepository} from "../../blogs/infrastructure/blog.repository";


@Injectable()
export class PostService {
    constructor(private postRepository: PostRepository,
                private blogRepository: BlogRepository) {
    }

    async createPost(postDto: PostCreateDto, blogName?: string) {
        const blog = await this.blogRepository.find(postDto.blogId)
        if(!blog){
            throw new NotFoundException('Blog not found in database')
        }
        const post = new Post(postDto, blog.name)
    const newPostId = await this.postRepository.insertPost(post);
    if (!newPostId) {
      return {
        error: 'Ошибка при созданий поста',
      };
    }
    return newPostId;
  }
  async updatePostById(postId: string, postDto: PostCreateDto) {
    const existingPost = await this.postRepository.find(postId);
    if (!existingPost) {
      throw new NotFoundException('Post not found in database');
    }
    existingPost.updatePost(postDto);
    await existingPost.save();
  }
  async deletePostById(postId: string) {
    return await this.postRepository.deletePostById(postId);
  }
}
