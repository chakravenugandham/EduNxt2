import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"]
})
export class FeedbackComponent implements OnInit {

  //variable declaration
  learnerSatisfaction: any;
  learnerSatisfationBy: number;
  trainerRating: any;
  trainerRatingBy: number;
  contentRating: any;
  contentRatingBy: number;
  parseFloat = parseFloat;


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

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
    });
    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  //service call for apis
  getDataFromService() {
    this.spinner_loader = true;
    this.dashboardService.getFeedbackWidgetData().subscribe((response: any) => {
      this.responseData = response.data;
      this.spinner_loader = false;
      this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;

      this.learnerSatisfaction = Number(this.responseData["learnerSatisfaction"]);

      this.trainerRating = Number(this.responseData["trainerRating"]);
      this.contentRating = Number(this.responseData["contentRating"]);

      this.learnerSatisfationBy = Math.abs(
        Math.round(this.responseData["learnerSatisfationBy"])
      );
      this.trainerRatingBy = Math.abs(this.responseData["trainerRatingBy"]);
      this.contentRatingBy = Math.abs(
        Math.round(this.responseData["contentRatingBy"])
      );
    });
  }

  ngOnInit() {
    //service call initiated
    this.getDataFromService();
  }
}
