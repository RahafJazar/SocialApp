import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment, environment as prodEnvironment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PostsDataResponse } from '../models/posts-data.interface';
import { Post, PostMutationDataResponce } from '../models/post-mutation-data.interface';
import { PostDetailsDataResponce } from '../../features/details/models/post-details-data.interface';

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

  getHomeFeed(only: string, limit: number): Observable<Post> {
    return this.httpClient.get<Post>(``);
  }
}
