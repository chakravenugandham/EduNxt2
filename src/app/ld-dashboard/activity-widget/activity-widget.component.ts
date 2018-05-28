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
    usersTrained: "",
    goals: ""
  };

  getDataFromService() {
    this.getData.getActivityData().subscribe((response: any) => {
      console.log("activity Data:", response.data);
      this.responseData = response.data;
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
