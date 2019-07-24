import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/upload/upload.service';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css']
})
export class ExcelUploadComponent {

  eventInfoUploadStatus: boolean = false;
  eventSummaryUploadStatus: boolean = false;

  eventInformationFile : File;
  eventSummaryFile : File;
  errorMessage : string;
  successMessage : string;
  eventInformationFileName : string = "select event information file";
  eventSummaryFileName : string = "select event summary file";

  constructor(private uploadService : UploadService) {}

  handleFile1Input(files: FileList) {
    this.eventInformationFile = files.item(0);
    this.eventInformationFileName = files.item(0).name;
  }

  handleFile2Input(files: FileList) {
    this.eventSummaryFile = files.item(0);
    this.eventSummaryFileName = files.item(0).name;
  }

  uploadEventInformationFiles() {
    if(this.eventInformationFile != null) {
      this.uploadService.uploadEventInformationFile(this.eventInformationFile).subscribe(
        data => {
          if(data.responseCode == '200') {
            this.successMessage = 'File Uploaded Successfully'
            this.eventInfoUploadStatus = true;
          }
        }, error => {
          this.errorMessage = 'Upload Failed'
        }
      )
    }
  }

  uploadEventSummaryFiles() {
    if(this.eventSummaryFile != null) {
      this.uploadService.uploadEventSummaryFile(this.eventSummaryFile).subscribe(
        data => {
          if(data.responseCode == '200') {
            this.successMessage = 'File Uploaded Successfully'
            this.eventInfoUploadStatus = true;
          }
        }, error => {
          this.errorMessage = 'Upload Failed'
        }
      )
    }
  }
}
