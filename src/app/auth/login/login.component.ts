import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;
  formReady: boolean = false;
  loginForm: FormGroup;
  errorMessage: string;
  submitDissabled: boolean = false;
  roleOptions: any[];

  constructor(private fb: FormBuilder, private router: Router, private authSvc: AuthService) {
    this.authSvc.fetchRoles().subscribe(
      result => {
        this.roleOptions = [];
        result.response.forEach(element => {
          this.roleOptions.push(element);
        });
        this.loginForm = this.fb.group({
          associateId: ["", Validators.compose([Validators.required])],
          password: ["", Validators.compose([Validators.required])],
          role: ["POC", Validators.compose([Validators.required])]
        });
        this.formReady = true;
      },
      error => {
        console.log(error);
      });
  }

  validate() {
    this.submitDissabled = true;
    this.authSvc.login(this.loginForm.value).subscribe(
      result => {
        if (result.access_token != null) {
          sessionStorage.setItem("sessionId", result.access_token);
          this.router.navigate(["/dashboard"]);
        } else {
          this.errorMessage = "Invalid Credntials";
          this.submitDissabled = false;
        }
      },
      error => {
        this.errorMessage = "Invalid Credntials";
        this.submitDissabled = false;
      }
    );
  }

}
