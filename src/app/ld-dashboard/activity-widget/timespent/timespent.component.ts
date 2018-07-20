import { Component, OnInit } from "@angular/core";

import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-timespent",
  templateUrl: "./timespent.component.html",
  styleUrls: ["./timespent.component.scss"]
})
export class TimespentComponent implements OnInit {
  responseData = {};
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.dashboardService
      .getTimeSpentWidgetData()
      .subscribe((response: any) => {
        this.responseData = response.data;
        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
      });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
