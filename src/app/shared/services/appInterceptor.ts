import {Injectable, Inject, Optional} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {LocalStorageService} from "./localStorage.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor(private LocalStorageService: LocalStorageService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.LocalStorageService.get('t');
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req).pipe(tap(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.router.navigate(['login']);
        }
      }));

  }
}
