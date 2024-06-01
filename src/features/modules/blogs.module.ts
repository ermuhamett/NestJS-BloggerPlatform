import {Module, Provider} from "@nestjs/common";
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
import {CommentLikes, CommentLikesSchema, PostLikes, PostLikesSchema} from "../likes/domain/like.entity";
import {Comment, CommentSchema} from "./comments/domain/comment.entity";
import {PostController} from "./posts/api/post.controller";
import {CommentQueryRepository} from "./comments/infrastructure/comment.query.repository";
import {CommentController} from "./comments/api/comment.controller";

const blogProviders:Provider[]=[
    BlogService,
    BlogRepository,
    BlogQueryRepository
]

const postProviders:Provider[]=[
    PostService,
    PostRepository,
    PostQueryRepository
]
const commentProviders:Provider[]=[
    CommentQueryRepository
]
@Module({
    imports:[
        MongooseModule.forFeature([
            {name:Blog.name, schema:BlogSchema},
            {name:Post.name, schema:PostSchema},
            {name:PostLikes.name, schema:PostLikesSchema},
            {name:Comment.name, schema:CommentSchema},
            {name:CommentLikes.name, schema:CommentLikesSchema}])
    ],
    controllers:[BlogController, PostController, CommentController],
    providers:[...blogProviders, ...postProviders, ...commentProviders/*BlogService, PostService, BlogRepository, BlogQueryRepository, PostRepository, PostQueryRepository*/],
})

export class BlogsModule{}