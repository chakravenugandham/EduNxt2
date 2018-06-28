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

  responseImageData = {}

  responseGoalsData = {
    timeSpent: "",
    usersTrained: ""
  };

  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe((result) => {
      this.getDataFromService();
    })
  }

  getDataFromService() {
    this.getData.getActivityData().subscribe((response: any) => {
      this.responseData = response.data;
    });

    this.getData.getImageData().subscribe((response: any) => {
      this.responseImageData = response.data;
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
