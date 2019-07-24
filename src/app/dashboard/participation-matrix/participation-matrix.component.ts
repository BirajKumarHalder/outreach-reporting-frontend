import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { FormControl } from '@angular/forms';
// import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// import { default as _rollupMoment } from 'moment';
// const moment = _rollupMoment || _moment;
// const moment = _moment;
// export const DATE_FORMATS = {
//   parse: {
//     dateInput: 'YYYY-MM-DD',
//   },
//   display: {
//     dateInput: 'YYYY/MM/DD',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };


@Component({
  selector: 'app-participation-matrix',
  templateUrl: './participation-matrix.component.html',
  // providers: [
  //   { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  //   { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  // ],
  styleUrls: ['./participation-matrix.component.css']
})
export class ParticipationMatrixComponent implements OnInit {

  filterApplied: boolean = false;
  startDateFilter: string;
  endDateFilter: string;
  project: string[] = [];
  projectFilter: any[];
  category: string[] = [];
  categoryFilter: any[];
  businessUnit: string[] = [];
  businessUnitFilter: any[];
  baseLocation: string[] = [];
  locationFilter: any[];

  panelOpenState = false;
  isDataReady: boolean = false;
  isError: boolean = false;
  errorMessage: string;
  eventData: any[];
  response: any;

  peerComparisonPieChartType: string = 'doughnut';
  peerComparisonPieChartDatasets: Array<any>;
  peerComparisonPieChartLabels: Array<any>;
  peerComparisonPieChartColors: Array<any>;
  peerComparisonPieChartOptions: any = {
    responsive: true
  };

  designationVsVolunteerChartDatasets: Array<any>;
  designationVsVolunteerChartType: string = 'bar';
  designationVsVolunteerChartLabels: Array<any>;
  designationVsVolunteerChartColors: Array<any>;
  designationVsVolunteerChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true
        }
      ],
      yAxes: [
        {
          stacked: true
        }
      ]
    }
  };

  constructor(private dashboardSvc: DashboardService) { }

  ngOnInit() {
    let request = {};
    this.getPerticipationData(request);
  }

  getPerticipationData(request: any) {
    // console.log(request);
    this.dashboardSvc.getPerticipationData(request).subscribe(
      result => {
        if (result.responseCode == '200') {
          this.response = result.response;
          this.eventData = result.response.eventModels;
          this.peerComparisonPieChartDatasets = [
            { data: result.response.peerComparisonPieChartModel.data, label: result.response.peerComparisonPieChartModel.label }
          ];
          this.peerComparisonPieChartLabels = result.response.peerComparisonPieChartModel.chartLabels;
          this.peerComparisonPieChartColors = [
            {
              backgroundColor: result.response.peerComparisonPieChartModel.backgroundColor,
              hoverBackgroundColor: result.response.peerComparisonPieChartModel.hoverBackgroundColor,
              borderWidth: 1,
            }
          ];
          this.designationVsVolunteerChartColors = result.response.designationVsVolunteerChartModel.chartColors;
          this.designationVsVolunteerChartDatasets = result.response.designationVsVolunteerChartModel.chartDatasets;
          this.designationVsVolunteerChartLabels = result.response.designationVsVolunteerChartModel.chartLabels;
          this.startDateFilter = result.response.filterCriteriaModel.startDate;
          this.endDateFilter = result.response.filterCriteriaModel.endDate;
          this.projectFilter = result.response.projectFilter;
          this.project = [];
          result.response.projectFilter.forEach(element => {
            if (element.selected) {
              this.project.push(element.name);
            }
          });
          this.categoryFilter = result.response.categoryFilter;
          this.category = [];
          result.response.categoryFilter.forEach(element => {
            if (element.selected) {
              this.category.push(element.name);
            }
          });
          this.locationFilter = result.response.locationFilter;
          this.baseLocation = [];
          result.response.locationFilter.forEach(element => {
            if (element.selected) {
              this.baseLocation.push(element.name);
            }
          });
          this.businessUnitFilter = result.response.businessUnitFilter;
          this.businessUnit = [];
          result.response.businessUnitFilter.forEach(element => {
            if (element.selected) {
              this.businessUnit.push(element.name);
            }
          });

          this.isDataReady = true;
        }
      },
      error => {
        this.errorMessage = error.message;
        this.isError = true;
      })
  }

  toggleFilterAppliedFlag() {
    this.filterApplied = true;
  }

  applyFilter() {
    this.filterApplied = false;
    let request = {
      "baseLocation": this.baseLocation,
      "businessUnit": this.businessUnit,
      "project": this.project,
      "category": this.category,
      "startDate": this.startDateFilter,
      "endDate": this.endDateFilter
    };
    this.getPerticipationData(request);
  }

  changeCategories(e: any) {
    if (e.selected && !this.category.includes(e.name)) {
      this.category.push(e.name);
    } else if (!e.selected && this.category.includes(e.name)) {
      this.category.splice(this.category.indexOf(e.name), 1);
    }
  }

  changeProjects(e: any) {
    if (e.selected && !this.project.includes(e.name)) {
      this.project.push(e.name);
    } else if (!e.selected && this.project.includes(e.name)) {
      this.project.splice(this.project.indexOf(e.name), 1);
    }
  }

  changeLocations(e: any) {
    if (e.selected && !this.baseLocation.includes(e.name)) {
      this.baseLocation.push(e.name);
    } else if (!e.selected && this.baseLocation.includes(e.name)) {
      this.baseLocation.splice(this.baseLocation.indexOf(e.name), 1);
    }
  }

  changeBusinessUnits(e: any) {
    if (e.selected && !this.businessUnit.includes(e.name)) {
      this.businessUnit.push(e.name);
    } else if (!e.selected && this.businessUnit.includes(e.name)) {
      this.businessUnit.splice(this.businessUnit.indexOf(e.name), 1);
    }
  }

}
