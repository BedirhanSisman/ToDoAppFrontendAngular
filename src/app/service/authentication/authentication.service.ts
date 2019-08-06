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

  _userList: User[];

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  authenticate(user: User) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");

    return this.httpClient.post('http://localhost:8080/login', user, { headers: headers, observe: 'response' }).pipe(   // login service metodunu çağır
      map(
        userData => {
          sessionStorage.setItem('username', user.username);                                                            // login işlemi bittikten sonra username'i set et
          sessionStorage.setItem('authorizationToken', userData.headers.get('Authorization'));                          // login işlemi bittikten sonra authorizationToken'i set et

          let role: UserRole;
          this.userService.findUserRoleByUsername(user.username).subscribe(                                             // demin atadığın username değerini parametre olarak 
                                                                                                                        // başka bir service fonksiyonuna gönder ve role tanımını bul
            data => {
              role = data;
              sessionStorage.setItem('userRole', role.authority);

              this.userService.findAll().subscribe(data => {                                                            // Role tanımını bulduktan sonra tüm kullanıcıları userList dizisine ata.
                this._userList = data; 
              }); 
            
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
    this.dropAllRolesFromSessionStorage();
  }

  dropAllRolesFromSessionStorage() {
    if(this._userList != null){
      for (let index = 0; index < this._userList.length; index++) {
        const user = this._userList[index];
        sessionStorage.removeItem('role' + user.username);
      }
    }
  }

}