import { Component, OnInit } from "@angular/core";
import { observable } from "rxjs";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-activity-widget",
  templateUrl: "./activity-widget.component.html",
  styleUrls: ["./activity-widget.component.scss"]
})
export class ActivityWidgetComponent implements OnInit {
  constructor(private getData: LdDashboardService) { }

  responseData = {
    activeUsers: "",
    learnerEngagement: "",
    learnerPace: "",
    feedback: "",

  };
  responseGoalsData = {
    usersTrained: "",
    timeSpent: ""
  }

  getDataFromService() {
    this.getData.getActivityData().subscribe((response: any) => {
      this.responseData = response.data;
      console.log(this.responseData);
    });
  }

  getGoalsDataFromService() {
    this.getData.getGoalsData().subscribe((response: any) => {
      this.responseGoalsData = response.data;
      console.log("goals data", this.responseGoalsData);
    });
  }

  ngOnInit() {
    this.getDataFromService();
    this.getGoalsDataFromService();
  }
}
