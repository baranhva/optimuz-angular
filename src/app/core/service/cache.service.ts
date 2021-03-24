import { HttpRequest, HttpResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class CacheService {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | null;
  abstract put(req: HttpRequest<any>, res: HttpResponse<any>): void;
}
