import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CanActivate, CanLoad, Route, Router} from '@angular/router';
import {AdminType, CaretakerType, UserType} from '../../shared/interface/user.interface';

const jwtHelper = new JwtHelperService();


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
export class AuthService implements CanActivate, CanLoad {

  private token: TokenPayload;

  private readonly ACCESS_TOKEN_STORAGE_KEY: string = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN_STORAGE_KEY: string = 'REFRESH_TOKEN';

  constructor(private http: HttpClient, private router: Router) {
    this.init();
  }

  private init(): void {
    const token = this.getAccessToken();
    if (!jwtHelper.isTokenExpired(token)) {
      this.token = jwtHelper.decodeToken(token);
    }
  }

  getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_STORAGE_KEY);
  }

  logout(): void {
    this.removeTokens();
    this.router.navigate(['/']);
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
      );
  }

  refreshToken(): Observable<Tokens> {
    return this.http.post<Tokens>(`/auth/refresh`, {
      refreshToken: this.getRefreshToken()
    }).pipe(tap(this.storeTokens));
  }

  private decodeToken(tokens: Tokens): void {
    this.token = jwtHelper.decodeToken(tokens.accessToken);
  }

  private storeTokens(tokens: Tokens): void {
    localStorage.setItem(this.ACCESS_TOKEN_STORAGE_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_STORAGE_KEY, tokens.refreshToken);
  }

  private removeTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_STORAGE_KEY);
    delete this.token;
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
    return !!this.token; // !jwtHelper.isTokenExpired(this.getAccessToken());
  }

  canActivate(): boolean {
    return this.isLoggedIn();
  }

  canLoad(route: Route): boolean {
    if (!!route?.data?.type && this.isUserType(route?.data?.type)) {
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
