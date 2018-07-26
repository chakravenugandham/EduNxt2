import { Component, OnInit } from "@angular/core";
import { observable } from "rxjs";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-scores-distribution-widget",
  templateUrl: "./scores-distribution-widget.component.html",
  styleUrls: ["./scores-distribution-widget.component.scss"]
})
export class ScoresDistributionWidgetComponent implements OnInit {
  filtersData = {
    routeTo: "scoreDistributionFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: []
  };
  getValue: string = "test";
  filterbody = {};
  responseData = [];
  dataSet = [[0, 0], [20], [40], [60], [80], [100], [110, 0]];
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  testScoreFn() {
    this.getValue = "test";
    this.filtersData.filterList = ["batch"];
    this.getDataFromService();
  }

  quizScoreFn() {
    this.getValue = "quiz";
    this.filtersData.filterList = ["batch", "quiz"];
    this.getDataFromService();
  }

  assignmentFn() {
    this.getValue = "assignment";
    this.filtersData.filterList = ["batch", "assignment"];
    this.getDataFromService();
  }

  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }

  getDataFromService() {
    this.responseData = [];
    this.spinner_loader = true;
    this.dashboardService
      .getScoresDistrubution(this.getValue, this.filterbody)
      .subscribe((response: any) => {
        this.responseData = response.data;
        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
        for (let i = 1; i <= this.responseData.length; i++) {
          this.dataSet[i][1] = this.responseData[i - 1].numberOfUsers;
        }
      });
  }

  ngOnInit() {
    this.filtersData.filterList = ["batch"];
    this.getDataFromService();
  }
}
