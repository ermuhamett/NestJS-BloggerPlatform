import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../application/post.service';
import { PostRepository } from '../infrastructure/post.repository';
import { PostQueryRepository } from '../infrastructure/post.query.repository';
import { PostCreateDto } from './models/input/post.input.model';
import {
  QueryInputType,
  QueryParams,
} from '../../../../base/adapters/query/query.class';
import { CommentQueryRepository } from '../../comments/infrastructure/comment.query.repository';
import { LikeInputDto } from '../../../likes/api/models/likes.info.model';
import { UserRepository } from '../../../users/infrastructure/user.repository';
import { AuthGuard } from '@nestjs/passport';

ApiTags('Posts');
@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService,
    private postRepository: PostRepository,
    private postQueryRepository: PostQueryRepository,
    private commentQueryRepository: CommentQueryRepository,
    private userRepository: UserRepository,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Put(':postId/like-status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePostLikeStatus(
    @Request() req,
    @Param('postId') postId: string,
    @Body() likeDto: LikeInputDto,
  ) {
    const post = await this.postRepository.find(postId);
    const user = await this.userRepository.find(req.user.userId);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return await this.postService.createLikePost(
      postId,
      likeDto.likeStatus,
      user.id.toString(),
      user.login,
    );
  }
  @Get(':postId/comments')
  @HttpCode(HttpStatus.OK)
  async getCommentsForPost(
    @Request() req,
    @Param('postId') postId: string,
    @Query() query: QueryInputType,
  ) {
    const post = await this.postRepository.find(postId);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    const sanitizedQuery = new QueryParams(query).sanitize();
    return await this.commentQueryRepository.getCommentsWithPaging(
      sanitizedQuery,
      postId,
      req.user.userId,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPostsWithPaging(@Query() query: QueryInputType) {
    const sanitizedQuery = new QueryParams(query).sanitize();
    return await this.postQueryRepository.getPostsWithPaging(sanitizedQuery);
  }

  @UseGuards(AuthGuard('basic'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() postDto: PostCreateDto) {
    const postId = await this.postService.createPost(postDto);
    if (!postId) {
      throw new HttpException(
        'Some error when created post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return await this.postQueryRepository.getPostById(postId.toString());
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPostById(@Param('id') id: string) {
    return await this.postQueryRepository.getPostById(id);
  }

  @UseGuards(AuthGuard('basic'))
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePostById(
    @Param('id') id: string,
    @Body() postDto: PostCreateDto,
  ) {
    return this.postService.updatePostById(id, postDto);
    //Можно в контроллере не писать HttpException так как сервис может кинуть NotFound и контроллер автоматический обработает его
  }

  @UseGuards(AuthGuard('basic'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePostById(@Param('id') id: string) {
    const post = await this.postRepository.find(id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    await this.postService.deletePostById(id);
  }
}
