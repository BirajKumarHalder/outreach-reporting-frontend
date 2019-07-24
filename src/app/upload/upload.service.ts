import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { environment, serviceUrl } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpSvc: HttpService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  });
  uploadEventInformationFile(file: File) {
    let formData = new FormData();
    formData.append('multipartFile', file, file.name);
    return this.httpSvc.post(serviceUrl.eventInfoUploadServiceUrl, this.headers, formData);
  }

  uploadEventSummaryFile(file: File) {
    let formData = new FormData();
    formData.append('multipartFile', file, file.name);
    return this.httpSvc.post(serviceUrl.eventSummaryUploadServiceUrl, this.headers, formData);
  }
}
