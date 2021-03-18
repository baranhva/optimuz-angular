import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN_STORAGE_KEY: string = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN_STORAGE_KEY: string = 'REFRESH_TOKEN';

  constructor(private http: HttpClient) { }

  getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_STORAGE_KEY);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<Tokens>(`/auth/login`, {email, password})
      .pipe(
        tap(this.storeTokens),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      )
  }

  refreshToken(): Observable<Tokens> {
    return this.http.post<Tokens>(`/auth/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap(this.storeTokens));
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.ACCESS_TOKEN_STORAGE_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_STORAGE_KEY, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_STORAGE_KEY);
  }
}
