import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((response: HttpResponse<any>) => {
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error);
  }
}
