import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public readonly STORAGE_BASE_URL = 'http://localhost:8080';
  currentUser: User;                    // user information
  currentToken: string = null;
  jwtService = new JwtHelperService();  // utility function to decode token

  constructor(private http: HttpClient) {
    this.updateUserInformation();
  }

  isloggedInTrue():boolean{
    if (this.currentUser.name === '') {
      return false;
    }
    return true;
  }

  isLoggedIn(): boolean {
    if (this.currentUser.name === '') {
      return false;
    }
    // check if token is expired
    const expirationDate: number = this.jwtService.getTokenExpirationDate(this.currentToken).getTime();
    const currentTime: number = new Date().getTime();

    return expirationDate > currentTime;
  }

  signIn(userId: string, userPassword: string) {
    console.log('userId: ' + userId + ', userPassword: ' + userPassword);
    const postObservable = this.http.post<HttpResponse<User>>(this.STORAGE_BASE_URL + '/authenticate/login',
        { id: userId, password: userPassword },
        { observe: 'response' });

    postObservable.subscribe(response => {
          console.log(response);
          let token = response.headers.get('Authorization');

          if (token == null) {
            throw new Error('token was not present in the response');
          }
          token = token.replace('Bearer ', '');

          // this.setToken(token,((response.body as unknown) as User).name)
          sessionStorage.setItem('token' , token);
          this.updateUserInformation();
      },
      (err) => {
        console.log('authentication error', err);
        // this.setToken(null, null);
        this.currentUser = null;
        this.currentToken = null;
      });
    return postObservable;
  }

  logout() {
    sessionStorage.removeItem('token');
    this.updateUserInformation();
  }


  private updateUserInformation() {
    this.currentToken = sessionStorage.getItem('token');

    if (this.currentToken != null) {
      const decodedToken = this.jwtService.decodeToken(this.currentToken);

      // this.currentUser = new User();
      // this.currentUser.name = decodedToken.sub;
      // this.currentUser.id = decodedToken.id;
      // this.currentUser.role = decodedToken.role;

      this.currentUser = new User(decodedToken.sub, decodedToken.role, decodedToken.status);
      this.currentUser.id = decodedToken.id;
    } else {
      this.currentUser = new User('', '', '');
    }
  }
}
