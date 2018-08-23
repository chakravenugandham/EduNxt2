import { Component, OnInit, OnChanges } from "@angular/core";

import { LdDashboardService } from "../services/ld-dashboard.service";

import { _ } from "underscore";

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
    // viewDetailsFilters: true
  };
  filterName = ["batch"];

  getValue: string = "test";
  filterbody = {};
  responseData = [];

  appliedFilters = [];
  testFilters = [];
  quizFilters = [];
  assignmentFilters = [];

  // dataSet = [[0, 0], [20], [40], [60], [80], [100], [110, 0]];
  dataSet = [[0, 0], [20], [40], [60], [80], [100]];
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

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  testScoreFn() {
    this.getValue = "test";
    this.filterName = ["batch"];
    this.appliedFilters = this.testFilters;
    this.getDataFromService();
  }

  quizScoreFn() {
    this.getValue = "quiz";
    this.filterName = ["batch", "quiz"];
    this.appliedFilters = this.quizFilters;
    this.getDataFromService();
  }

  assignmentFn() {
    this.getValue = "assignment";
    this.filterName = ["batch", "assignment"];
    this.appliedFilters = this.assignmentFilters;
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

  addFilters($event) {
    this.appliedFilters.push($event);
  }

  removedFilters($event) {
    let indexF = _.findIndex(this.appliedFilters, $event);
    this.appliedFilters.splice(indexF, 1);
  }

  ngOnInit() {
    this.appliedFilters = this.testFilters;
    this.getDataFromService();
  }
}
