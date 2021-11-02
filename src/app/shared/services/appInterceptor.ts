import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {LocalStorageService} from "./localStorage.service";

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor( private LocalStorageService: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.LocalStorageService.get('t');
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req);
  }
}
