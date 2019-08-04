import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../model/User';
import { UserService } from '../user/user.service';
import { UserRole } from 'src/app/model/UserRole';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  authenticate(user: User) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");

    return this.httpClient.post('http://localhost:8080/login', user, { headers: headers, observe: 'response' }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', user.username);
          sessionStorage.setItem('authorizationToken', userData.headers.get('Authorization'));

          let role: UserRole;
          this.userService.findUserRoleByUsername(user.username).subscribe(
            data => {
              role = data;
              sessionStorage.setItem('userRole', role.authority);
            }
          );

          return userData;
        }
      )
    );
  }

  isUserLoggedIn() {
    let username = sessionStorage.getItem('username');
    return !(username === null);
  }

  isUserAdmin() {
    let userRoleName = sessionStorage.getItem('userRole');
    return (userRoleName === 'ROLE_ADMIN');
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('authorizationToken');
  }

}