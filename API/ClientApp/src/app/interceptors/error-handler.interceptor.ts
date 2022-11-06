import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastr:ToastrService, private router:Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            console.log(error);
            const errorList = [];
            if(error.error.errors){

              for(let key in error.error.errors){
                if(error.error.errors[key]){
                  errorList.push(error.error.errors[key]);
                }
              }
              throw errorList.flat();
            }else{
              this.toastr.error(error.statusText, error.status.toString());
            }

            break;
          case 401:
            this.toastr.error(error.statusText, error.status.toString());
            break;
          case 404:
            this.router.navigateByUrl('not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {state: {error: error.error}};
            console.log('in the interceptor', navigationExtras);

            this.router.navigateByUrl('server-error', navigationExtras);
            break;

          default:
            this.toastr.info('Something unexpected going wrong');
            console.log(error.error.message);
            break;
        }


        return throwError(error.message);
      })
    );

  }
}
