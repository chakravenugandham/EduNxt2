import { Component, OnInit } from "@angular/core";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-learners-track-widget",
  templateUrl: "./learners-track-widget.component.html",
  styleUrls: ["./learners-track-widget.component.scss"]
})
export class LearnersTrackWidgetComponent implements OnInit {
  learnerPace: boolean = true;

  componentName: string = "pace";

  // routePath: string = "learnerTrackFullView";
  filtersData: {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    filterList: ["zone"]
  };

  widgetData = {
    pace: "",
    performance: ""
  };

  learnerPaceFn() {
    this.learnerPace = true;
    this.componentName = "pace";
    this.getData();
  }

  learnerPerfFn() {
    this.learnerPace = false;
    this.componentName = "performance";
    this.getData();
  }

  getData() {
    this.serviceData
      .getLearnerTrackData(this.componentName)
      .subscribe((response: any) => {
        if (this.componentName == "pace") {
          this.widgetData.pace = response.data;
        } else {
          this.widgetData.performance = response.data;
        }
        console.log("response", response);
        console.log("this.widgetData", this.widgetData);
      });
  }

  constructor(private serviceData: LdDashboardService) {}

  ngOnInit() {
    this.getData();
  }
}
