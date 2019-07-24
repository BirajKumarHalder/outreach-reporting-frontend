import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpHeaders } from '@angular/common/http';
import { environment, serviceUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  constructor(private httpSvc: HttpService) { }

  fetchRoleHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Basic d2ViLWFwcDpzZWNyZXQ='
  });

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + sessionStorage.getItem("sessionId")
  });


  fetchRoles() {
    if (environment.useMock) {
      return this.httpSvc.getMockData("./assets/mock/fetchRoles.json");
    } else {
      return this.httpSvc.get(serviceUrl.fetchRoleServiceUrl, this.fetchRoleHeaders);
    }
  }

  addUser(request: any) {
    if (environment.useMock) {
      return this.httpSvc.getMockData("./assets/mock/fetchRoles.json");
    } else {
      return this.httpSvc.post(serviceUrl.addUserServiceUrl, this.headers, request);
    }
  }

}
