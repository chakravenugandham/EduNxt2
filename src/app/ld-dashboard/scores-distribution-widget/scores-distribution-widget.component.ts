import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { observable } from "rxjs";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-scores-distribution-widget",
  templateUrl: "./scores-distribution-widget.component.html",
  styleUrls: ["./scores-distribution-widget.component.scss"]
})
export class ScoresDistributionWidgetComponent implements OnInit, OnChanges {
  routePath: string = "scoreDistributionFullView";
  filtersData = {
    routeTo: "scoreDistributionFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["batch"]
  };
  getValue: string = "test";
  filterbody = {};

  constructor(private getData: LdDashboardService) { }

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
    console.log("this.filterbody", this.filterbody);
  }

  responseData = {};

  getDataFromService() {
    this.getData
      .getScoresDistrubution(this.getValue, this.filterbody)
      .subscribe((response: any) => {
        this.responseData = response.data;
        console.log(this.responseData);
      });
  }

  ngOnInit() {
    this.getDataFromService();
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes.filterbody){
      this.getDataFromService();
    }
  }

}
