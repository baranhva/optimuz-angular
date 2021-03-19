import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, mapTo, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CanLoad, Route, Router} from '@angular/router';

const jwtHelper = new JwtHelperService();

export type UserType = "ADMIN" | "CARE_TAKER" | "PATIENT";

export const AdminType: UserType = "ADMIN";
export const CaretakerType: UserType = "CARE_TAKER";
export const PatientType: UserType = "PATIENT";

interface TokenPayload {
  id?: number;
  email?: string;
  type?: UserType;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanLoad {

  private token: TokenPayload;

  private readonly ACCESS_TOKEN_STORAGE_KEY: string = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN_STORAGE_KEY: string = 'REFRESH_TOKEN';

  constructor(private http: HttpClient, private router: Router) { }

  getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_STORAGE_KEY);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<Tokens>(`/auth/login`, {email, password})
      .pipe(
        map((tokens: Tokens) => {
          this.storeTokens(tokens);
          this.decodeToken(tokens);
          return true;
        }),
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

  private decodeToken(tokens: Tokens) {
    this.token = jwtHelper.decodeToken(tokens.accessToken);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.ACCESS_TOKEN_STORAGE_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_STORAGE_KEY, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_STORAGE_KEY);
  }

  isAdmin(): boolean {
    return this.isUserType(AdminType);
  }

  isCaretaker(): boolean {
    return this.isUserType(CaretakerType);
  }

  private isUserType(type: UserType): boolean {
    return this.token?.type === type;
  }

  isLoggedIn(): boolean {
    return !jwtHelper.isTokenExpired(this.getAccessToken());
  }

  canLoad(route: Route): boolean {
    if (!!route.data['type'] && this.isUserType(route.data['type'])) {
      return true;
    } else {
      if (!this.isLoggedIn()) {
        this.router.navigate(['']);
        return true;
      } else {
        return false;
      }
    }
  }
}
