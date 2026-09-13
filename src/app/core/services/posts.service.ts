import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as prodEnvironment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PostsDataResponse } from '../models/posts-data.interface';
import { PostMutationDataResponce } from '../models/post-mutation-data.interface';
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

}
