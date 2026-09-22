import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserDataResponse } from '../models/user-data.interface';
import { FollowDataResponse } from '../models/follow-data-response.interface';
import { PostsDataResponse } from '../models/posts-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private httpClient = inject(HttpClient);


  getMyProfile(): Observable<UserDataResponse> {
    return this.httpClient.get<UserDataResponse>(`${environment.base_url}/users/profile-data`);
  }

  getFollowProfileSuggestions(limit = 10): Observable<FollowDataResponse> {
    return this.httpClient.get<FollowDataResponse>(`${environment.base_url}/users/suggestions?limit=${limit}`);
  }

  getMyPosts(myId: string | undefined): Observable<PostsDataResponse> {
    return this.httpClient.get<PostsDataResponse>(`${environment.base_url}/users/${myId}/posts`)

  }
}
