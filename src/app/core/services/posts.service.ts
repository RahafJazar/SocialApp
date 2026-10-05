import { PostMutationDataResponce } from './../models/post-mutation-data.interface';
import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment, environment as prodEnvironment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LikePostResponse, PostsDataResponse } from '../models/posts-data.interface';
import { Post } from '../models/post-mutation-data.interface';
import { PostDetailsDataResponce } from '../../features/details/models/post-details-data.interface';
import { SKIP_GLOBAL_LOADING } from '../interceptors/loading/http-context-token/loading-context';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private httpClient = inject(HttpClient);


  geAllPosts(): Observable<PostsDataResponse> {
    return this.httpClient.get<any>(`${prodEnvironment.base_url}/posts`)
  }
  createPost(request: FormData): Observable<PostMutationDataResponce> {
    return this.httpClient.post<PostMutationDataResponce>(`${prodEnvironment.base_url}/posts`, request)
  }
  getsinglePost(postID: string | number): Observable<PostDetailsDataResponce> {
    return this.httpClient.get<PostDetailsDataResponce>(`${prodEnvironment.base_url}/posts/${postID}`)
  }
  updatePost(postID: string | number, data: object): Observable<any> {
    return this.httpClient.put<any>(`${prodEnvironment.base_url}/posts/${postID}`, data)
  }
  deletePost(postID: string | number): Observable<any> {
    return this.httpClient.delete<any>(`${prodEnvironment.base_url}/posts/${postID}`)
  }
  getUserPosts(userId: string): Observable<PostsDataResponse> {
    return this.httpClient.get<PostsDataResponse>(`${environment.base_url}/users/${userId}/posts`)
  }
  getMyPosts(myId: string | undefined): Observable<PostsDataResponse> {
    return this.httpClient.get<PostsDataResponse>(`${environment.base_url}/users/${myId}/posts`)
  }

  getHomeFeed(only: string = 'following', limit: number, page: number): Observable<PostsDataResponse> {
    return this.httpClient.get<PostsDataResponse>(`${environment.base_url}/posts/feed?only=${only}&limit=${limit}&page=${page}`, {
      context: new HttpContext().set(SKIP_GLOBAL_LOADING, true)
    });
  }

  sharePost(postId: string, content: { [key: string]: string }): Observable<PostsDataResponse> {
    return this.httpClient.post<PostsDataResponse>(`${environment.base_url}/posts/${postId}/share`, content, {
      context: new HttpContext().set(SKIP_GLOBAL_LOADING, true)
    })
  }

  likePost(postId: string): Observable<LikePostResponse> {
    return this.httpClient.put<LikePostResponse>(`${environment.base_url}/posts/${postId}/like`, {}, {
      context: new HttpContext().set(SKIP_GLOBAL_LOADING, true)
    })
  }
}
