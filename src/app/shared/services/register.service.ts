import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserReq, IUserRes} from "../../../data";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  getAdmins(): Observable<Array<IUserRes>> {
    return this.http.get<Array<IUserRes>>(`${environment.baseUrl}admins`);
  }
  register(data: IUserReq): Observable<IUserRes> {
    return this.http.post<IUserRes>(`${environment.baseUrl}admins/new`, data)
  }

}
