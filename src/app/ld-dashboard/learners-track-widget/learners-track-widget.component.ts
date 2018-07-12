import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";

import { LdDashboardService } from "../services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

@Component({
  selector: "app-learners-track-widget",
  templateUrl: "./learners-track-widget.component.html",
  styleUrls: ["./learners-track-widget.component.scss"]
})
export class LearnersTrackWidgetComponent implements OnInit, OnChanges {
  componentName: string = "pace";
  filtersData = {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["batch"],
    currentModule: this.componentName
  };

  // filtersData = {};
  widgetData = {
    pace: "",
    performance: ""
  };

  filterbody = {};

  constructor(
    private serviceData: LdDashboardService,
    private filterData: CommonService
  ) {
    this.serviceData.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.serviceData.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  learnerPaceFn() {
    this.componentName = "pace";
    this.filterData.learnerFilterBodyDetails = this.filtersData;
    this.getDataFromService();
  }

  learnerPerfFn() {
    this.componentName = "performance";
    this.filterData.learnerFilterBodyDetails = this.filtersData;
    this.getDataFromService();
  }

  getDataFromService() {
    this.serviceData
      .getLearnerTrackData(this.filterbody)
      .subscribe((response: any) => {
        this.widgetData.pace = response.data.paceData;
        this.widgetData.performance = response.data.performanceData;
      });
  }

  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterbody) {
      this.getDataFromService();
    }
  }

  ngOnInit() {
    this.learnerPaceFn();
    this.getDataFromService();
  }
}
