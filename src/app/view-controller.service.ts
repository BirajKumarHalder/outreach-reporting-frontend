import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ViewControllerService {

  constructor() { }

  private isLoggedin = new BehaviorSubject(false);
  loggedIn = this.isLoggedin.asObservable();

  changeLoggedInStateState(state: boolean) {
    this.isLoggedin.next(state);
  }
}
