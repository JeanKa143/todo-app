import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../../services/auth.service';
import { UserAuth } from '../../interfaces/user-auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private tokenScheme = 'Bearer';
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private readonly tokenStorageService: TokenStorageService, private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = this.tokenStorageService.getJwtToken();
    if (jwtToken) request = this.addTokenHeader(request, jwtToken);

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) return this.handle401Error(request, next);
        throw error;
      })
    );
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const tokenData = this.tokenStorageService.getTokenData();
      const jwt = this.tokenStorageService.getJwtToken();
      const refreshToken = this.tokenStorageService.getRefreshToken();
      let userAuth: UserAuth | null = null;

      if (tokenData && jwt && refreshToken) userAuth = { id: tokenData.userId, token: jwt, refreshToken };

      if (userAuth)
        return this.authService.refreshToken(userAuth).pipe(
          switchMap(res => {
            this.isRefreshing = false;

            this.tokenStorageService.saveJwtToken(res.token);
            this.tokenStorageService.saveRefreshToken(res.refreshToken);
            return next.handle(this.addTokenHeader(request, res.token));
          }),
          catchError(err => {
            this.isRefreshing = false;
            this.authService.singout();
            throw err;
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `${this.tokenScheme} ${token}`
      }
    });
  }
}
