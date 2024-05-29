export enum LikeStatus {
    NONE = 'None',
    LIKE = 'Like',
    DISLIKE = 'Dislike',
}

export class NewestLike {
    constructor(
        public addedAt: string,
        public userId: string,
        public login: string
    ) {}
}

export class ExtendedLikesInfo {
    constructor(
        public likesCount: number,
        public dislikesCount: number,
        public myStatus: LikeStatus, // Используем новый тип
        public newestLikes: NewestLike[]
    ) {}
}