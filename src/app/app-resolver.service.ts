import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ViewControllerService } from './view-controller.service';


@Injectable({
  providedIn: 'root'
})
export class AppResolverService implements Resolve<any>{

  constructor(private viewControllerSvc: ViewControllerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.viewControllerSvc.changeLoggedInStateState(route.data.loggedIn);
    return null;
  }

}
