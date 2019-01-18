import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('error.interceptor');
        if (err instanceof HttpErrorResponse) {
          if (err.status > 499 && err.status < 600) {
            this.toastrService.error('The server is currently not available!', 'Message');
          } else if (err.status === 400) {
            this.toastrService.error('Bad Request!', 'Message');
          } else if (err.status === 401) {
            this.toastrService.error('Unauthorized', 'Message');
          } else if (err.status === 403) {
            this.toastrService.error('Forbidden', 'Message');
          } else if (err.status === 404) {
            this.toastrService.error('Not Found', 'Message');
          } else {
            this.toastrService.error('Some Error occurred!', 'Message');
          }
        }
        return throwError(err);
      })
    );
  }
}
