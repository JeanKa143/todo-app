import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserSingup, UserAuth } from '../interfaces/user-auth';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { Api400Error } from 'src/app/shared/errors/classes/api-error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}users`;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private readonly http: HttpClient) {}

  singup(userSingup: UserSingup): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, userSingup).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error.status === 400 ? Api400Error.fromJson(error.error) : error;
      })
    );
  }

  login(userLogin: UserLogin): Observable<UserAuth> {
    return this.http.post<UserAuth>(`${this.apiUrl}/login`, userLogin).pipe(
      map(res => {
        this.storeJwtToken(res.token);
        this.storeRefreshToken(res.refreshToken);
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        throw error.status === 400 ? Api400Error.fromJson(error.error) : error;
      })
    );
  }

  private storeJwtToken(jwt: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }
}
