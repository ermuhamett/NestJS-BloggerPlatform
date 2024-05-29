import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Post, PostDocument} from "../domain/post.entity";
import {NewestLikesMapper, PostMapper, PostOutputDto} from "../api/models/output/post.output.model";
import {ExtendedLikesInfo, LikeStatus} from "../../../likes/api/models/likes.info.model";
import {PostLikes, PostLikesDocument} from "../../../likes/domain/like.entity";


@Injectable()
export class PostQueryRepository {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>,
                @InjectModel(PostLikes.name) private postLikesModel: Model<PostLikesDocument>) {
    }

    async find(id: string) {
        try {
            return await this.postModel.findById(id, {__v: false})
        } catch (e) {
            return false
        }
    }

    async getPostById(postId: string, userId?: string): Promise<PostOutputDto> {
        const post = await this.find(postId)
        if (!post) {
            throw new NotFoundException('Post not found')
        }
        const likes: ExtendedLikesInfo = await this.getPostLikes(postId, userId)
        return PostMapper.toView(post, likes)
    }

    async getPostLikes(postId: string, userId?: string) {
        try {
            let likeStatus = LikeStatus.NONE;
            let userLike;
            // Если userId предоставлен, выполните запрос на поиск userLike
            if (userId) {
                userLike = await this.postLikesModel.findOne({postId, likedUserId: userId}).lean();
                if (userLike) {
                    likeStatus = userLike.status
                }
            }
            // Запрос для получения всех необходимых данных с использованием Promise.all
            const [likesCount, dislikesCount, newestLikes] = await Promise.all([
                this.postLikesModel.countDocuments({postId, status: LikeStatus.LIKE}),
                this.postLikesModel.countDocuments({postId, status: LikeStatus.DISLIKE}),
                this.postLikesModel.find({postId, status: LikeStatus.LIKE}).sort({addedAt: -1}).limit(3).lean()
            ])
            return {
                likesCount,
                dislikesCount,
                myStatus: likeStatus,
                newestLikes: newestLikes.map(NewestLikesMapper.toView),

            }
        } catch (error) {
            console.error(`Error while getting likes for postId ${postId}: `, error);
            throw error;
        }
    }
}