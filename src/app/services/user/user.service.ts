import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../../models/user.interface';
import JwtToken from '../../models/jwtToken.interface';
import { environment } from '../../../environments/environment';
import { enableAuthContext } from '../../interceptors/authentification/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private getUserApi = `${environment.apiUrl}/me`;
  private authApi = `${environment.apiUrl}/login_check`;
  private http = inject(HttpClient);

  getUser(): Observable<User> {
    return this.http.get<User>(this.getUserApi, {
      headers: { 'accept': 'application/json' },
      context: enableAuthContext()
    });
  }

  login(user: Partial<User>): Observable<JwtToken> {
    return this.http.post<JwtToken>(this.authApi, user);
  }

}
