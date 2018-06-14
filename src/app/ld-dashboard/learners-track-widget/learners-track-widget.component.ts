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
    filterList: ["zone"],
    currentModule: this.componentName
  };

  widgetData = {
    pace: "",
    performance: ""
  };

  filterbody = {};

  constructor(private serviceData: LdDashboardService) { }

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
        console.log("this.widgetData", this.widgetData);
      });
  }

  getFilterObject($event) {
    this.filterbody = $event;
    this.getData();
    console.log("this.filterbody", this.filterbody);
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (this.filterbody) {
    //   console.log("body changed");
    //   this.getData();
    // }
  }

  ngOnInit() {
    this.getData();
  }

}
