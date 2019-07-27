import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from './Models/Task';

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
    return this.http.get<Task[]>(this.baseURL);
  }

  public saveTask(task: Task) {
    return this.http.post<Task>(this.baseURL, task);
  }

  public deleteTask(taskName: string): Observable<{}> {    
    return this.http.delete(this.baseURL + '/' + taskName);
  }

  public updateTask(task: Task): Observable<{}> {    
    return this.http.put<Task>(this.baseURL, task);
  }
}