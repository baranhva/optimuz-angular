import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ApiPrefixInterceptor} from './interceptor/api-prefix.interceptor';
import {JwtInterceptor} from './interceptor/jwt.interceptor';
import {TokenInterceptor} from './interceptor/token.interceptor';
import {AuthService} from './service/auth.service';
import {LoginGuard} from './guard/login.guard';
import {CacheService} from './service/cache.service';
import {CacheMapService} from './service/cache-map.service';
import {CachingInterceptor} from './interceptor/caching.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthService,
    { provide: CacheService, useClass: CacheMapService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    },
    LoginGuard
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
