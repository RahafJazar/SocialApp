import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataResponse } from '../../models/user-data.interface';
import { environment as prodEnvironment } from '../../../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);


  signUp(request: any): Observable<UserDataResponse> {
    return this.http.post<UserDataResponse>(`${prodEnvironment.base_url}/users/signup`, request);
  }
  signIn(request: any): Observable<any> {
    return this.http.post<any>(`${prodEnvironment.base_url}/users/signin`, request);
  }

  //حطيناها بالسيرفس لانه ممكن نستخدمها باكثر من مكان
  signOut(): void {
    //logic of signOut
    //1-remove token & user data
    //2- navigate to login

    localStorage.removeItem('socialToken');
    localStorage.removeItem('userData');
    this.router.navigate(['/login'])

  }
}
