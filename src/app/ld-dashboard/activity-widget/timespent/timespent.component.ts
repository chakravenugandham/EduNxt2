import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-timespent",
  templateUrl: "./timespent.component.html",
  styleUrls: ["./timespent.component.scss"]
})
export class TimespentComponent implements OnInit {

  //variable declaration
  responseData = {};
  timeSpentPercent: number;
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

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

  //service call for api
  getDataFromService() {
    this.spinner_loader = true;
    this.dashboardService
      .getTimeSpentWidgetData()
      .subscribe((response: any) => {
        this.responseData = response.data;
        this.timeSpentPercent = response.data.timeSpent;

        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
      });
  }

  ngOnInit() {
    //service call initiated
    this.getDataFromService();
  }
}
