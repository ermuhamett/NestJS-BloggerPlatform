import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./blogs/domain/blog.entity";
import {Post, PostSchema} from "./posts/domain/post.entity";
import {BlogController} from "./blogs/api/blog.controller";
import {BlogService} from "./blogs/application/blog.service";
import {PostService} from "./posts/application/post.service";
import {BlogRepository} from "./blogs/infrastructure/blog.repository";
import {BlogQueryRepository} from "./blogs/infrastructure/blog.query.repository";
import {PostRepository} from "./posts/infrastructure/post.repository";
import {PostQueryRepository} from "./posts/infrastructure/post.query.repository";
import {PostLikes, PostLikesSchema} from "../likes/domain/like.entity";

@Module({
    imports:[
        MongooseModule.forFeature([{name:Blog.name, schema:BlogSchema}, {name:Post.name, schema:PostSchema}, {name:PostLikes.name, schema:PostLikesSchema}])
    ],
    controllers:[BlogController],
    providers:[BlogService, PostService, BlogRepository, BlogQueryRepository, PostRepository, PostQueryRepository],
})

export class BlogsModule{}