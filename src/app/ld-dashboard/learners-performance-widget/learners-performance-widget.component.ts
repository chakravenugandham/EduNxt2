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
  getTab: string = 'performance';
  responseData = {};

  constructor(private getData: LdDashboardService) { }
  performanceFn() {
    this.getTab = 'performance';
  }
  progressFn() {
    this.getTab = 'progress';
  }

  getDataFromService() {
    this.getData.getProgressData().subscribe((response: any) => {
      this.responseData = response.data;
    })
  }
  ngOnInit() {
    this.getDataFromService();
  }
}
