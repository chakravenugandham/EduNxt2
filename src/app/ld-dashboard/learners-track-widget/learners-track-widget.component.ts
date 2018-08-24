import { Component, OnInit } from "@angular/core";

import { LdDashboardService } from "../services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

import { _ } from "underscore";

@Component({
  selector: "app-learners-track-widget",
  templateUrl: "./learners-track-widget.component.html",
  styleUrls: ["./learners-track-widget.component.scss"]
})
export class LearnersTrackWidgetComponent implements OnInit {

  filtersData = {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["batch"],
    currentModule: '',
    appliedFilters: []
  };

  paceObject = {
    filters: ["batch"],
    appliedFilters: [],
    responseData: []
  }

  performanceObject = {
    filters: ["batch"],
    appliedFilters: [],
    responseData: []
  }

  // paceObject.appliedFilters = [
  //   {
  //     type: "batch",
  //     id: 59,
  //     name: "Batch1"
  //   },
  //   {
  //     type: "quiz",
  //     id: 109,
  //     name: "Quiz1"
  //   },
  //   {
  //     type: "batch",
  //     id: 79,
  //     name: "Batch2"
  //   },
  //   {
  //     type: "quiz",
  //     id: 143,
  //     name: "Quiz2"
  //   }
  // ];

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  myStorage = window.localStorage;

  constructor(private dashboardService: LdDashboardService, private filterData: CommonService) {
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

  learnerPaceFn() {
    this.filtersData.currentModule = "pace";
    localStorage.setItem("trackComponent", this.filtersData.currentModule);
    this.filtersData.appliedFilters = this.paceObject.appliedFilters;
    this.getDataFromService();
  }

  learnerPerfFn() {
    this.filtersData.currentModule = "performance";
    localStorage.setItem("trackComponent", this.filtersData.currentModule);
    this.filtersData.appliedFilters = this.performanceObject.appliedFilters;
    this.getDataFromService();
  }

  getDataFromService() {
    this.spinner_loader = true;

    this.dashboardService
      .getLearnerTrackData(this.filtersData.appliedFilters)
      .subscribe((response: any) => {
        this.spinner_loader = false;

        this.paceObject.responseData = response.data.paceData;
        this.performanceObject.responseData = response.data.performanceData;

        if (this.filtersData.currentModule == "pace") {
          this.noDataFlag = _.isEmpty(this.paceObject.responseData) ? true : false;
        } else if (this.filtersData.currentModule == "performance")
          this.noDataFlag = _.isEmpty(this.performanceObject.responseData) ? true : false;
      });
  }

  addFilters($event) {
    this.filtersData.appliedFilters = $event;
    this.getDataFromService();
  }

  ngOnInit() {
    this.learnerPaceFn();
  }
}
