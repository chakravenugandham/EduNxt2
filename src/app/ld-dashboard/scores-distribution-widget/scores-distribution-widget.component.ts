import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { observable } from "rxjs";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-scores-distribution-widget",
  templateUrl: "./scores-distribution-widget.component.html",
  styleUrls: ["./scores-distribution-widget.component.scss"]
})
export class ScoresDistributionWidgetComponent implements OnInit, OnChanges {
  filtersData = {
    routeTo: "scoreDistributionFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["batch"]
  };
  getValue: string = "test";
  filterbody = {};
  responseData = [];
  dataSet = [[0, 0], [20], [40], [60], [80], [100], [110, 0]];

  constructor(private getData: LdDashboardService) {}

  testScoreFn() {
    this.getValue = "test";
    this.getDataFromService();
  }

  quizScoreFn() {
    this.getValue = "quiz";
    this.getDataFromService();
  }

  assignmentFn() {
    this.getValue = "assignment";
    this.getDataFromService();
  }
  
  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }

  // data model
  // dataSet = [[0, 0], [20, 100], [40, 600], [60, 1000], [80, 600], [100, 100], [110, 0]]

  getDataFromService() {
    this.getData
      .getScoresDistrubution(this.getValue, this.filterbody)
      .subscribe((response: any) => {
        this.responseData = response.data;
        for (let i = 1; i <= this.responseData.length; i++) {
          this.dataSet[i][1] = this.responseData[i - 1].numberOfUsers;
        }
      });
  }

  ngOnInit() {
    this.getDataFromService();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterbody.currentValue) {
      this.getDataFromService();
    }
  }
}
