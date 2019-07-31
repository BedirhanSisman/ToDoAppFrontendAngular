import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Task } from '../model/Task';

// service katmanı spring boot rest servisleri ile haberleşmeyi sağlıyor, 
// bu class hangi TypeScript sınıfına enjekte edilirse orada kullnılabilecek şekilde encapsule ediliyor.
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  
  private baseURL: string;

  constructor(private http: HttpClient) { 
    this.baseURL = 'http://localhost:8080/api/tasks/list';
  }

  public findAll(): Observable<Task[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorizationToken') });
    let endpo = this.http.get<Task[]>(this.baseURL, {headers});
    return this.http.get<Task[]>(this.baseURL, {headers});
  }

  public saveTask(task: Task) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorizationToken') });
    return this.http.post<Task>(this.baseURL, task, {headers});
  }

  public deleteTask(taskName: string): Observable<{}> {   
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorizationToken') });
    return this.http.delete(this.baseURL + '/' + taskName, {headers});
  }

  public updateTask(task: Task): Observable<{}> {    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorizationToken') });
    return this.http.put<Task>(this.baseURL, task, {headers});
  }
}