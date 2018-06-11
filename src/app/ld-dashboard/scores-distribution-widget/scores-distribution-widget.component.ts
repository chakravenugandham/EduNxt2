import { Component, OnInit } from "@angular/core";
import { observable } from "rxjs";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-scores-distribution-widget",
  templateUrl: "./scores-distribution-widget.component.html",
  styleUrls: ["./scores-distribution-widget.component.scss"]
})
export class ScoresDistributionWidgetComponent implements OnInit {
  routePath: string = "scoreDistributionFullView";
  filtersData = {
    routeTo: "scoreDistributionFullView",
    filters: true,
    search: false,
    filterList: ["zone"]
  };
  getValue: string = "test";
  testScoreFn() {
    if (this.getValue != "test") {
      this.getDataFromService();
      this.getValue = "test";
    }
  }
  quizScoreFn() {
    if (this.getValue != "quiz") {
      this.getDataFromService();
      this.getValue = "quiz";
    }
  }
  assignmentFn() {
    if (this.getValue != "assignment") {
      this.getDataFromService();
      this.getValue = "assignment";
    }
  }
  responseData = {};
  constructor(private getData: LdDashboardService) {}

  getDataFromService() {
    this.getData
      .getScoresDistrubution(this.getValue)
      .subscribe((response: any) => {
        this.responseData = response.data;
      });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
