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

  appliedFilters: any[];
  paceFilters = [{
    type: "batch",
    filters: [
      {
        id: 59,
        name: "201801"
      },
      {
        id: 79,
        name: "201806AAA"
      }
    ]
  }];

  performanceFilters = [{
    type: "batch",
    filters: [
      {
        id: 36,
        name: "201706"
      },
      {
        id: 37,
        name: "201711"
      }
    ]
  }]

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

    this.myStorage.setItem('learnerTrackCurrentModule', this.componentName);
    console.log(this.myStorage);
  }

  learnerPaceFn() {
    this.componentName = "pace";
    this.myStorage.setItem('learnerTrackCurrentModule', this.componentName);
    this.getDataFromService();
  }

  learnerPerfFn() {
    this.componentName = "performance";
    this.myStorage.setItem('learnerTrackCurrentModule', this.componentName);
    this.getDataFromService();
  }

  getDataFromService() {
    this.responseData = [];
    this.spinner_loader = true;

    this.appliedFilters = this.componentName == "pace" ? this.paceFilters : this.performanceFilters;

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
  removedFilters($event) {
    for (let i in this.appliedFilters) {
      let indexF = _.findIndex(this.appliedFilters[i].filters, $event);
      this.appliedFilters[i].filters.splice(indexF, 1);
    }
  }

  ngOnInit() {
    this.myStorage.removeItem('currentModuleName');
    this.learnerPaceFn();
    this.getDataFromService();
  }
}
