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
  private apiUrl = `${environment.apiUrl}/users`;
  private http = inject(HttpClient);
  id: Number | null = null;

  getUser(): Observable<User> {
    return this.http.get<User>(this.getUserApi, {
      headers: { 'accept': 'application/json' },
      // Permet de dire qu'il faut que l'interceptor ajoute le token pour cette requète
      context: enableAuthContext()
    });
  }

  login(user: Partial<User>): Observable<JwtToken> {
    return this.http.post<JwtToken>(this.authApi, user);
  }

  register(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, {
      headers: { 'accept': 'application/json' }
    });
  }

  edit(id: number, changes: Partial<User>): Observable<User> {
    return this.http.patch<User>(this.apiUrl + '/' + id, changes, {
      headers: {
        'content-type': 'application/merge-patch+json',
        'accept': 'application/json'
      },
      context: enableAuthContext()
    });
  }


}
