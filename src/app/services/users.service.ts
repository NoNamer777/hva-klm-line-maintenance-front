import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<User[]>(environment.apiUrl.concat('/users'));
  }

  addUser(user: User) {
    return this.http.post<User>(environment.apiUrl.concat('/users'), user).subscribe();
  }

  saveUser(user: User) {
    return this.http.put<User>(environment.apiUrl.concat('/users'), user).subscribe();
  }

  deleteUser(id: string) {
    return this.http.delete(environment.apiUrl.concat('/users/').concat(id.toString())).subscribe();
  }
}
