import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserDataResponse } from '../models/user-data.interface';
import { FollowDataResponse } from '../models/follow-data-response.interface';
import { PostsDataResponse } from '../models/posts-data.interface';
import { BookmarksDataResponse } from '../models/bookmarks-data.interface';
import { NotificationsDataResponse } from '../models/notifications-data.interface';

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



  getUserProfile(userId: string): Observable<UserDataResponse> {
    return this.httpClient.get<UserDataResponse>(`${environment.base_url}/users/${userId}/profile`)
  }

  getBookmarks(): Observable<BookmarksDataResponse> {
    return this.httpClient.get<BookmarksDataResponse>(`${environment.base_url}/users/bookmarks`)
  }
  getNotifications(limit: number = 10, page: number = 1, unread: boolean = false): Observable<NotificationsDataResponse> {
    return this.httpClient.get<NotificationsDataResponse>(`${environment.base_url}/notifications?unread=${unread}&page=${page}&limit=${limit}`)
  }
}
