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
  getValue: string = "";
  testScoreFn() {
    this.getValue = 'testScore';
  }
  quizScoreFn() {
    this.getValue = 'quiz';
  }
  assignmentFn() {
    this.getValue = 'assignment';
  }
  responseData = {};
  constructor(private getData: LdDashboardService) { }

  getDataFromService() {
    this.getData.getScoresDistrubution().subscribe((response: any) => {
      this.responseData = response.data;
      console.log(this.responseData);
    });
  }

  ngOnInit() { }
}
