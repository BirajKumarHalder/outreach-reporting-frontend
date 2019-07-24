import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UploadRoutingModule } from './upload-routing.module';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';

@NgModule({
  imports: [
    CommonModule,
    UploadRoutingModule,
    MDBBootstrapModule
  ],
  declarations: [ExcelUploadComponent]
})
export class UploadModule { }
