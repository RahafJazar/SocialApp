import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as prodEnvironment } from '../../../../../../../../environments/environment';
import { CommentsDataResponse } from '../models/comments-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private httpClient = inject(HttpClient);
  myHeaders: {} = {
    AUTHORIZATION: `Bearer ` + localStorage.getItem('socialToken')
  }

  getPostComments(postID: string, page: number = 1, limit: number = 10): Observable<CommentsDataResponse> {
    return this.httpClient.get<CommentsDataResponse>(`${prodEnvironment.base_url}/posts/${postID}/comments?page=${page}&limit=${limit}`, {
      headers: this.myHeaders
    });

  }
  createComment(postID: string): Observable<any> {
    return this.httpClient.get<any>(`${prodEnvironment.base_url}/posts/${postID}/comments`, {
      headers: this.myHeaders
    });

  }

}
