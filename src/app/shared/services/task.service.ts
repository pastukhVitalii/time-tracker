import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITask} from "../../../data";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) {
  }

  getTasks(id: string | undefined): Observable<Array<ITask>> {
    return this.http.get<Array<ITask>>(`${environment.baseUrl}project/tasks/${id}`);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}task/${taskId}`)
  }

  editTask(taskId: string, task_name: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}task/${taskId}`, {task_name})
  }

  createTask(projectId: string, taskName: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}tasks`, {task_name: taskName, project_id: projectId})
  }
}
