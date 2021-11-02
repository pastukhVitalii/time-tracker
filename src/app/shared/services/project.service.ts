import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProject, IUserReq, IUserRes} from "../../../data";
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
}
