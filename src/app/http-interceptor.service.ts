import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let token = sessionStorage.getItem('sessionId');
    let clonedRequest = request;
    if (token != null) {
      clonedRequest = request.clone({
        headers: request.headers.set('Authorization', "Bearer " + token)
      });
    }
    // console.log('request --->>>' + clonedRequest)
    return next.handle(clonedRequest)
      .pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //console.log('response --->>>', event);
        }
        return event;
      }));
  }

}
