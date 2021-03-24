import {CacheMapService} from '../service/cache-map.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {CacheService} from '../service/cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isPossibleToCacheRequest(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cacheService.get(req);
    if (cachedResponse !== null) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(req, event);
        }
      })
    );
  }

  private isPossibleToCacheRequest(req: HttpRequest<any>): boolean {
    return (req.method === 'GET');
  }
}
