import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-userstrained",
  templateUrl: "./userstrained.component.html",
  styleUrls: ["./userstrained.component.scss"]
})
export class UserstrainedComponent implements OnInit {

  //variable declaration
  responseData: any = {};
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
      .getUsersTrainedWidgetData()
      .subscribe((response: any) => {
        this.responseData = response.data;
        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
      });
  }

  ngOnInit() {
    //service call initiated
    this.getDataFromService();
  }
}
