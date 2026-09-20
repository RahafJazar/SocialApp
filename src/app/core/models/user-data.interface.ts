

export interface UserDataResponse {
    success: boolean
    message: string
    data: UserData
}

export interface UserData {
    token: string
    tokenType: string
    expiresIn: string
    user: UserInfo
}

export interface UserInfo {
    _id?: string;
    name?: string;
    username?: string;
    email?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female';
    photo?: string;
    cover?: string;
    bookmarks?: string[];
    followers?: string[];
    following?: string[];
    createdAt?: string;
    followersCount?: number;
    followingCount?: number;
    bookmarksCount?: number;
    id?: string;
}

