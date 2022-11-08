import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaderResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  currentUser: User;
  constructor(private authService:AccountService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    this.authService.curentUser$.pipe(
    take(1)).subscribe(user => {
      this.currentUser = user;
    });

    if(!this.currentUser){
      return next.handle(req);
    }
    const modifyedReq = req.clone({
      setHeaders: {'Test-Header': 'Some-test-header-value', 'Authorization': 'Bearer '+this.currentUser.token},
    });
    return next.handle(modifyedReq);
  }
}
