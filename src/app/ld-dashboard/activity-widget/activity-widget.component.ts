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

  resposeData = {
    activeUsers: "",
    learnerEngagement: "",
    learnerPace: "",
    feedback: "",
    usersTrained: "",
    goals: ""
  };

  getDataFromService() {
    this.getData.getActivityData().subscribe((respose: any) => {
      console.log("activity Data:",respose.data);
      
      this.resposeData = respose.data;
<<<<<<< HEAD
=======
      console.log("respose activeUsers", respose.data);
>>>>>>> f3b6c9b65ad8281537667517fd86482d2d3f5e2e
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
