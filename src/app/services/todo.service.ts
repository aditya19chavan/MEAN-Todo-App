import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Task {
  _id?: string;
  task: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
