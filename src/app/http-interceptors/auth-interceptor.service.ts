import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');

    if (token != null) {
      const headersConfig = {
        Authorization: 'Bearer ' + token
      };

      const cloned = req.clone({
        setHeaders: headersConfig
      });

      // using pipe(share()) to prevent multiple submissions per subscriber (observables are cold)
      const observable = next.handle(cloned).pipe(share());
      observable.subscribe((data) => {
        // For future usage: if you want to intercept responses, this is the place :-)
        console.log(data);
      }, (error) => {
        console.error('Auth-Interceptor error: ' + error);
      });

      return observable;
    } else {
      return next.handle(req);
    }
  }

}
