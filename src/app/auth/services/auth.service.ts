import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserSingup, UserAuth } from '../interfaces/user-auth';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { Api400Error } from 'src/app/shared/errors/classes/api-error';
import { TokenStorageService } from '../shared/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}users`;

  constructor(private readonly http: HttpClient, private readonly tokenStorageService: TokenStorageService) {}

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
        this.tokenStorageService.saveJwtToken(res.token);
        this.tokenStorageService.saveRefreshToken(res.refreshToken);
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        throw error.status === 400 ? Api400Error.fromJson(error.error) : error;
      })
    );
  }

  singout(): void {
    localStorage.clear();
  }

  refreshToken(userAuth: UserAuth): Observable<UserAuth> {
    return this.http.post<UserAuth>(`${this.apiUrl}/${userAuth.id}/refresh-token`, userAuth).pipe(
      map(res => {
        this.tokenStorageService.saveJwtToken(res.token);
        this.tokenStorageService.saveRefreshToken(res.refreshToken);
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        throw error.status === 400 ? Api400Error.fromJson(error.error) : error;
      })
    );
  }
}
