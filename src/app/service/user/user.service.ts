import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { UserRole } from 'src/app/model/UserRole';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string;

  constructor(private http: HttpClient) { 
    this.baseURL = 'http://localhost:8080/api/users';
  }

  public findAll(): Observable<User[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorizationToken') });
    return this.http.get<User[]>(this.baseURL + '/list', {headers});
  }

  public findUserByUsername(username: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorizationToken') });
    return this.http.get<User>(this.baseURL + '/' + username, {headers});
  }

  public saveUser(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorizationToken') });
    return this.http.post(this.baseURL + '/register', user, {headers});
  }

  public deleteUser(username: string): Observable<{}> {   
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorizationToken') });
    return this.http.delete(this.baseURL + '/' + username, {headers});
  }

  public findUserRoleByUsername(username: string): Observable<UserRole> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorizationToken') });
    return this.http.get<UserRole>(this.baseURL + '/role/' + username, {headers});
  }

}
