import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewControllerService } from '../view-controller.service';
import * as jwt from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  navbarOpen = false;
  isLoggedIn: boolean = false;
  name: string;
  role: string;

  constructor(private router: Router, private viewControllerSvc: ViewControllerService) {
    this.viewControllerSvc.loggedIn.subscribe(result => {
      this.isLoggedIn = result;
      if (this.isLoggedIn) {
        let tokenInfo = jwt(sessionStorage.getItem("sessionId"));
        this.name = tokenInfo.user_name;
        this.role = tokenInfo.authorities[0];
      }
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(["/auth"])
  }

}
