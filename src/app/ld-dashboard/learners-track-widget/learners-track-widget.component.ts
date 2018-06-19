import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-learners-track-widget",
  templateUrl: "./learners-track-widget.component.html",
  styleUrls: ["./learners-track-widget.component.scss"]
})
export class LearnersTrackWidgetComponent implements OnInit, OnChanges {
  learnerPace: boolean = true;
  componentName: string = "pace";

  filtersData = {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["batch"],
    currentModule: this.componentName
  };

  widgetData = {
    pace: "",
    performance: ""
  };

  filterbody = {};

  constructor(private serviceData: LdDashboardService) {}

  learnerPaceFn() {
    this.learnerPace = true;
    this.componentName = "pace";
    this.getData();
  }

  learnerPerfFn() {
    this.learnerPace = false;
    this.componentName = "performance";
    this.getData();
  }

  getData() {
    this.serviceData
      .getLearnerTrackData(this.filterbody)
      .subscribe((response: any) => {
        this.widgetData.pace = response.data.paceData;
        this.widgetData.performance = response.data.performanceData;
      });
  }

  getFilterObject($event) {
    this.filterbody = $event;
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterbody) {
      this.getData();
    }
  }

  ngOnInit() {
    this.getData();
  }
}
