import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataResponse } from '../../models/user-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);


  signUp(request: any): Observable<UserDataResponse> {
    return this.http.post<UserDataResponse>('https://route-posts.routemisr.com/users/signup', request);
  }
  signIn(request: any): Observable<any> {
    return this.http.post<any>('https://route-posts.routemisr.com/users/signin', request);
  }
}
