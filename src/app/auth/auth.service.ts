import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpHeaders } from '@angular/common/http';
import { environment, serviceUrl } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpSvc: HttpService) { }

  fetchRoles() {
    if (environment.useMock) {
      return this.httpSvc.getMockData("./assets/mock/fetchRoles.json");
    } else {
      return this.httpSvc.get(serviceUrl.fetchRoleServiceUrl);
    }
  }

  login(loginRequest: any) {
    if (environment.useMock) {
      return this.httpSvc.getMockData("./assets/mock/loginResp.json");
    } else {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Basic d2ViLWFwcDpzZWNyZXQ=');
      const body = new HttpParams()
        .set('username', loginRequest.associateId)
        .set('password', loginRequest.password)
        .set('grant_type', 'password')
        .set('role', loginRequest.role);
      return this.httpSvc.post(serviceUrl.authServiceUrl, { params: body }, headers);
    }
  }
}
