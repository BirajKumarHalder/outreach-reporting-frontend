import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-miscellaneous',
  templateUrl: './miscellaneous.component.html',
  styleUrls: ['./miscellaneous.component.css']
})
export class MiscellaneousComponent implements OnInit {

  isDataReady: boolean = false;
  isError: boolean = false;
  errorMessage: string;
  retentionModel: any;
  engagementModel: any;

  constructor(private dashboardSvc: DashboardService) { }

  ngOnInit() {
    this.dashboardSvc.getMiscleniousData().subscribe(
      result => {
        if (result.responseCode == '200') {
          this.retentionModel = result.response.retentionModel;
          this.engagementModel = result.response.engagementModel;
          this.isDataReady = true;
        }
      },
      error => {
        this.errorMessage = error.message;
        this.isError = true;
      })
  }

}
