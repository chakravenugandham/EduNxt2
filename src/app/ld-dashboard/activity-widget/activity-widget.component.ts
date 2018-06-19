import { Component, OnInit } from "@angular/core";
import { observable } from "rxjs";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-activity-widget",
  templateUrl: "./activity-widget.component.html",
  styleUrls: ["./activity-widget.component.scss"]
})
export class ActivityWidgetComponent implements OnInit {
  responseData = {
    activeUsers: "",
    learnerEngagement: "",
    learnerPace: "",
    feedback: ""
  };

  responseGoalsData = {
    timeSpent: "",
    usersTrained: ""
  };

  constructor(private getData: LdDashboardService) {}

  getDataFromService() {
    this.getData.getActivityData().subscribe((response: any) => {
      this.responseData = response.data;
    });
  }

  getGoalsDataFromService() {
    this.getData.getGoalsData().subscribe((response: any) => {
      this.responseGoalsData = response.data;
    });
  }

  ngOnInit() {
    this.getDataFromService();
    this.getGoalsDataFromService();
  }
}
