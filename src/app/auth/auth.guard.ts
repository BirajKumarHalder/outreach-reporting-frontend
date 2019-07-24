import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

  constructor(private router: Router) { }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    let tokenInfo = jwt(sessionStorage.getItem("sessionId"));
    if (tokenInfo.jti != null) {
      return true;
    }
    this.router.navigate(["auth"]);
    return false;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let tokenInfo = jwt(sessionStorage.getItem("sessionId"));
    if (tokenInfo.jti != null) {
      return true;
    }
    this.router.navigate(["auth"]);
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let tokenInfo = jwt(sessionStorage.getItem("sessionId"));
    if (tokenInfo.jti != null) {
      return true;
    }
    this.router.navigate(["auth"]);
    return false;
  }

}
