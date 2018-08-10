import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";

// import * as _ from "underscore";

import { LdDashboardService } from "../services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

@Component({
  selector: "app-learners-track-widget",
  templateUrl: "./learners-track-widget.component.html",
  styleUrls: ["./learners-track-widget.component.scss"]
})
export class LearnersTrackWidgetComponent implements OnInit {
  componentName: string = "pace";
  filtersData = {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: [],
    currentModule: this.componentName
  };
  filterName = ["batch"];
  responseData = [];

  widgetData = {
    pace: "",
    performance: ""
  };

  filterbody = {};

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(
    private dashboardService: LdDashboardService,
    private filterData: CommonService
  ) {
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
    this.componentName = this.filtersData.currentModule = "pace";
    this.filterData.learnerFilterBodyDetails = this.filtersData;
    this.getDataFromService();
  }

  learnerPerfFn() {
    this.componentName = this.filtersData.currentModule = "performance";
    this.filterData.learnerFilterBodyDetails = this.filtersData;
    this.getDataFromService();
  }

  getDataFromService() {
    this.responseData = [];
    this.spinner_loader = true;
    this.dashboardService
      .getLearnerTrackData(this.filterbody)
      .subscribe((response: any) => {
        this.responseData.push(response.data);
        this.widgetData.pace = response.data.paceData;
        this.widgetData.performance = response.data.performanceData;
        this.spinner_loader = false;
        // this.noDataFlag = _.isEmpty(this.widgetData.pace) ? true : false;
        if (this.componentName == "pace") {
          this.noDataFlag = Object.keys(this.widgetData.pace).length === 0 ? true : false;
        } else if (this.componentName == "performance")
          this.noDataFlag = Object.keys(this.widgetData.performance).length === 0 ? true : false;
      });
  }

  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }

  ngOnInit() {
    this.learnerPaceFn();
    this.getDataFromService();
  }
}
