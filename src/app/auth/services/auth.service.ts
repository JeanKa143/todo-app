import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSingup } from '../interfaces/user-singup';
import { environment } from 'src/environments/environment';
import { Observable, catchError } from 'rxjs';
import { Api400Error } from 'src/app/shared/interfaces/api-error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}users`;

  constructor(private readonly http: HttpClient) {}

  singup(userSingup: UserSingup): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, userSingup).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) throw error.error as Api400Error;
        // TODO: Handle error
        console.error(error);
        throw undefined;
      })
    );
  }
}
