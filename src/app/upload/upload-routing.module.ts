import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';

const routes: Routes = [
  {
    path: '',
    component: ExcelUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
