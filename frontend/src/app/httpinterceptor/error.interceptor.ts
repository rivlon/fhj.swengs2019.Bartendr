import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 409) {
            this.toastrService.error('Could not be deleted, still Drinks assigned!', 'Message');
          } else if (err.status === 410) {
            this.toastrService.success('Successfully deleted', 'Message');
          } else if (err.status === 504) {
            this.toastrService.error('Gateway timeout!', 'Error');
          } else if (err.status > 499 && err.status < 600) {
            this.toastrService.error('Some Server Error occurred!', 'Message');
          } else if (err.status === 400) {
            this.toastrService.error('Bad Request!', 'Message');
          } else if (err.status === 401) {
            this.toastrService.error('Unauthorized', 'Not authorized!');
            this.authService.logout();
          } else if (err.status === 403) {
            this.toastrService.error('Forbidden', 'Message');
          } else if (err.status === 404) {
            this.toastrService.error('Not Found', 'Message');
          }  else {
            this.toastrService.error('Some Error occurred!', 'Message');
          }
        }
        return throwError(err);
      })
    );
  }
}
