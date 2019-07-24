import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpHeaders } from '@angular/common/http';
import { environment, serviceUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private httpSvc: HttpService) { }

  getPerticipationData(request: any) {
    if (environment.useMock) {
      return this.httpSvc.getMockData("./assets/mock/dashboard.json");
    } else {
      let headers = new HttpHeaders()
        .set('Content-type', 'application/json; charset=utf-8');
      return this.httpSvc.post(serviceUrl.participationMatrixServiceUrl, headers, request);
    }
  }

  getMiscleniousData() {
    if (environment.useMock) {
      return this.httpSvc.getMockData("./assets/mock/misc.json");
    } else {
      return this.httpSvc.get(serviceUrl.engagementRetentionMatrixServiceUrl);
    }
  }
}
