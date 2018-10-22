import { Component, OnInit } from '@angular/core';
import { Config } from '../../../common/users-data/users-data.component';
import { LdDashboardService } from '../../services/ld-dashboard.service';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.scss']
})
export class EngagementComponent implements OnInit {
  // user data custom component
  config: Config;

  // variable declarations
  percentageChange: number;
  expectedChange: boolean;
  spinner_loader = false;
  noDataFlag = false;
  engageUserChange = false;

  responseData = {};

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });
    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
    });
    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });
  }


  // service call for api
  getDataFromService() {
    this.spinner_loader = true;
    this.dashboardService
      .getEngagementWidgetData()
      .subscribe((response: any) => {
        this.responseData = response.data;

        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length === 0 ? true : false;

        // this.engageUserChange = this.responseData["usersCompletedPrograms"] < this.responseData["completedProgramsSinceLastMonth"]? false: true;

        this.percentageChange = this.responseData['usersCompletedPrograms'] > 0 ? (this.responseData['usersCompletedPrograms'] * 100) / this.responseData['enrolledUsers'] : 0;

        this.config = {
          peopleCurrentlyEnrolled: Math.round(this.responseData['usersCompletedPrograms']),
          numberChange: this.percentageChange < 50 ? false : true,

          usersSinceLastMonth: Math.round(this.responseData['completedProgramsSinceLastMonth']),

          Users: 'Users',
          sinceLastMonth: '',
          PeopleAreCurrentlyEnrolled: 'People completed training programs'
        };
      });
  }

  ngOnInit() {
    // service call initiated
    this.getDataFromService();
  }
}
