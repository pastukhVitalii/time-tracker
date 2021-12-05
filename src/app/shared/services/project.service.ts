import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProject} from "../../../data";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Array<IProject>> {
    return this.http.get<Array<IProject>>(`${environment.baseUrl}projects`);
  }

  addProject(projectName: string): Observable<IProject> {
    return this.http.post<IProject>(`${environment.baseUrl}projects`, {projectName})
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}projects/${projectId}`)
  }

  updateProject(projectId: string, projectName: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}projects/${projectId}`, {projectName})
  }
}
