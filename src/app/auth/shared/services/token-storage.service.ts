import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { APIToken } from '../../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor() {}

  saveJwtToken(jwt: string): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  getTokenData(): APIToken | null {
    const token = this.getJwtToken();
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
}
