import { Component, OnInit } from "@angular/core";
import { observable } from "rxjs";
import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-learners-performance-widget",
  templateUrl: "./learners-performance-widget.component.html",
  styleUrls: ["./learners-performance-widget.component.scss"]
})
export class LearnersPerformanceWidgetComponent implements OnInit {
  routePath: string = "learnerPerformanceFullView";
  filtersData = {
    routeTo: "learnerPerformanceFullView",
    filters: true,
    search: false,
    filterList: ["zone"]
  };
  getTab: string = "performance";
  
  responseData = [];

  constructor(private getData: LdDashboardService) {}
  performanceFn() {
    this.getTab = "performance";
  }
  progressFn() {
    this.getTab = "progress";
  }

  getDataFromService() {
    this.getData.getLearnerPerformanceData().subscribe((response: any) => {
      this.responseData = response.data.performance;
      console.log("learnerPerformanceProgress Data", this.responseData);
    });
  }
  ngOnInit() {
    this.getDataFromService();
  }
}
