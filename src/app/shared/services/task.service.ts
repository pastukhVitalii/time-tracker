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
}
