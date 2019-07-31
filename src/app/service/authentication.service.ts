import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(user: User) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate', user).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', user.username);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('authorizationToken', tokenStr);
          return userData;
        }
      )
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }

}