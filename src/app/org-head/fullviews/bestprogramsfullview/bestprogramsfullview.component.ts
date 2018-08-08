import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from '../../../ld-dashboard/services/ld-dashboard.service';

@Component({
  selector: 'app-bestprogramsfullview',
  templateUrl: './bestprogramsfullview.component.html',
  styleUrls: ['./bestprogramsfullview.component.scss']
})
export class BestprogramsfullviewComponent implements OnInit {

  responseData = [];

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

  getDataFromService() {
    this.dashboardService
      .getBestProgramsDetails()
      .subscribe((response: any) => {
        this.responseData = response.data;
      });
  }

  ngOnInit() {
    this.getDataFromService();
  }

}
