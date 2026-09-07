

export interface PostMutationDataResponce {
    success: boolean;
    message: string;
    data: PostMutationData;
}

export interface PostMutationData {
    post: Post;
}

export interface Post {
    _id: string;
    id: string;

    body?: string;
    image?: string;

    privacy: PostPrivacy;
    user: string;

    sharedPost: Post | null;
    likes: string[];

    createdAt: string;
    likesCount: number;
    isShare: boolean;
}

export type PostPrivacy = string;