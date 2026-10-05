
export interface PostsDataResponse {
    success: boolean;
    message: string;
    data: Data;
    meta?: Meta;
}

export interface Data {
    posts: Post[];
}

// ==================== Post ====================

export interface Post extends BasePost {
    bookmarked: boolean;
}



// ==================== Shared Structure ====================

export interface BasePost {
    _id: string;
    image?: string;
    privacy: string;
    user: User;
    likes: string[];
    createdAt: string;
    sharedPost: BasePost;
    commentsCount: number;
    topComment?: TopComment;
    sharesCount: number;
    likesCount: number;
    isShare: boolean;
    id: string;
    body?: string;
}

// ==================== User ====================

export interface User {
    _id: string;
    name: string;
    username: string;
    photo: string;
}

// ==================== Comment ====================

export interface TopComment {
    _id: string;
    content: string;
    commentCreator: User;
    post: string;
    parentComment: unknown;
    likes: string[];
    createdAt: string;
}

// ==================== Meta ====================

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
    total?: number;
}

// ==================== Liked Posts Response ====================
export interface LikePostResponse {
    success: boolean;
    message: string;
    data: {
        liked: boolean;
        likesCount: number;
    };
}