import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanLoad, CanActivateChild {

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let tokenInfo = jwt(sessionStorage.getItem("sessionId"));
    let role = tokenInfo.authorities[0];
    if (role === "ADMIN") {
      return true;
    }
    return false;
  }
  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    let tokenInfo = jwt(sessionStorage.getItem("sessionId"));
    let role = tokenInfo.authorities[0];
    if (role === "ADMIN") {
      return true;
    }
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let tokenInfo = jwt(sessionStorage.getItem("sessionId"));
    let role = tokenInfo.authorities[0];
    if (role === "ADMIN") {
      return true;
    }
    return false;
  }

}
