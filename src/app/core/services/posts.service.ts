import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as prodEnvironment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PostsDataResponse } from '../models/posts-data.interface';
import { PostMutationDataResponce } from '../models/post-mutation-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private httpClient = inject(HttpClient);
  myHeaders: {} = {
    AUTHORIZATION: `Bearer ` + localStorage.getItem('socialToken')
  }

  geAllPosts(): Observable<PostsDataResponse> {
    return this.httpClient.get<any>(`${prodEnvironment.base_url}/posts`, {
      headers: this.myHeaders
    })
  }
  createPost(request: FormData): Observable<PostMutationDataResponce> {
    return this.httpClient.post<PostMutationDataResponce>(`${prodEnvironment.base_url}/posts`, request, {
      headers: this.myHeaders,

    })
  }
  getsinglePost(postID: string | number): Observable<any> {
    return this.httpClient.get<any>(`${prodEnvironment.base_url}/posts/${postID}`, {
      headers: this.myHeaders,

    })
  }
  updatePost(postID: string | number): Observable<any> {
    return this.httpClient.put<any>(`${prodEnvironment.base_url}/posts/${postID}`, {
      headers: this.myHeaders,

    })
  }
  deletePost(postID: string | number): Observable<any> {
    return this.httpClient.delete<any>(`${prodEnvironment.base_url}/posts/${postID}`, {
      headers: this.myHeaders,

    })
  }

}
