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
    filterList: ["batch"],
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
  performanceFilters = [];
  paceFilters = [];

  // testFilters = [
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

  // performanceFilters = [
  //   {
  //     type: "batch",
  //     id: 59,
  //     name: "Batch1"
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

    this.myStorage.setItem('learnerTrackCurrentModule', this.componentName);
  }

  learnerPaceFn() {
    this.componentName = "pace";
    this.myStorage.setItem('learnerTrackCurrentModule', this.componentName);
    this.appliedFilters = this.paceFilters;
    this.getDataFromService();
  }

  learnerPerfFn() {
    this.componentName = "performance";
    this.myStorage.setItem('learnerTrackCurrentModule', this.componentName);
    this.appliedFilters = this.performanceFilters;
    this.getDataFromService();
  }

  getDataFromService() {
    this.responseData = [];
    this.spinner_loader = true;

    // this.appliedFilters = this.componentName == "pace" ? this.paceFilters : this.performanceFilters;

    this.dashboardService
      .getLearnerTrackData(this.appliedFilters)
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

  // getFilterObject($event) {
  //   this.filterbody = $event;
  //   this.getDataFromService();
  // }

  addFilters($event) {
    this.appliedFilters.push($event);
    this.getDataFromService();
  }

  removedFilters($event) {
    let indexF = _.findIndex(this.appliedFilters, $event);
    this.appliedFilters.splice(indexF, 1);
    this.getDataFromService();
  }

  ngOnInit() {
    // console.log(this.testFilters);
    // let filterQuery = "";
    // for (let i in this.testFilters) {
    //   switch (this.testFilters[i].type) {
    //     case "batch": {
    //       filterQuery += this.testFilters[i].id + ",";
    //       continue;
    //     }
    //     case "quiz": {
    //       filterQuery += this.testFilters[i].id + ",";
    //       continue;
    //     }
    //   }
    // }
    // console.log(filterQuery);

    this.appliedFilters = this.paceFilters;
    this.learnerPaceFn();
    this.getDataFromService();
  }
}
