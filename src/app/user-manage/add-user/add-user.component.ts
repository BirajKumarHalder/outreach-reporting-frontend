import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserManageService } from '../user-manage.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  formReady: boolean = false;
  userAddForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  submitDissabled: boolean = false;
  roleOptions: any[];


  constructor(private fb: FormBuilder, private userSvc: UserManageService) {
    this.userSvc.fetchRoles().subscribe(
      result => {
        this.roleOptions = [];
        result.response.forEach(element => {
          this.roleOptions.push(element);
        });
        this.buildeAddUserForm();
        this.formReady = true;
      },
      error => {
        console.log(error);
      });
  }

  buildeAddUserForm() {
    this.userAddForm = this.fb.group({
      associateId: ["", Validators.compose([Validators.required])],
      associateName: ["", Validators.compose([Validators.required])],
      associateContact: ["", Validators.compose([Validators.required])],
      designation: ["", Validators.compose([Validators.required])],
      businessUnit: ["", Validators.compose([Validators.required])],
      location: ["", Validators.compose([Validators.required])],
      role: ["", Validators.compose([Validators.required])]
    });
  }

  addUser() {
    this.submitDissabled = true;
    let addUserRequest = {
      "associateId": this.userAddForm.value.associateId,
      "associateName": this.userAddForm.value.associateName,
      "associateContact": this.userAddForm.value.associateContact,
      "designation": this.userAddForm.value.designation,
      "businessUnit": this.userAddForm.value.businessUnit,
      "location": this.userAddForm.value.location,
      "associateVsRoleModels": [
        {
          "roleModel": {
            "roleId": this.userAddForm.value.role

          }
        }
      ]
    }
    this.userSvc.addUser(addUserRequest).subscribe(
      result => {
        this.successMessage = "User added successfully";
        this.buildeAddUserForm();
        this.submitDissabled = false;
      },
      error => {
        this.errorMessage = error.message;
        this.submitDissabled = false;
      }
    );
  }

}
