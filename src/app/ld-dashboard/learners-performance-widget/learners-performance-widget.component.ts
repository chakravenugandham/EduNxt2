import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { observable } from "rxjs";
import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-learners-performance-widget",
  templateUrl: "./learners-performance-widget.component.html",
  styleUrls: ["./learners-performance-widget.component.scss"]
})
export class LearnersPerformanceWidgetComponent implements OnInit, OnChanges {
  filtersData = {
    routeTo: "learnerPerformanceFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: []
  };
  getTab: string = "performance";
  responseData = [];
  filterbody = {};
  performanceDataSet = [];
  progressDataSet = [];
  batches = [];

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
  }

  performanceFn() {
    if (this.getTab != "performance") {
      this.getTab = "performance";
      this.getDataFromService();
    }
  }
  progressFn() {
    if (this.getTab != "progress") {
      this.getTab = "progress";
      this.getDataFromService();
    }
  }
  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }

  testData = [];

  getDataFromService() {
    this.performanceDataSet = [];
    this.progressDataSet = [];

    this.dashboardService
      .getLearnerPerformanceData(this.getTab)
      .subscribe((response: any) => {
        this.responseData = response.data;

        for (let i in this.responseData) {
          if (this.getTab == "performance") {
            this.performanceDataSet.push({
              label: this.responseData[i].courseName,
              Group1: this.responseData[i].performance
            });
          } else if (this.getTab == "progress") {
            this.progressDataSet.push({
              label: this.responseData[i].courseName,
              Group1: this.responseData[i].progress
            });
          }
        }
        // for (let i in this.responseData) {
        //   let performancegroupValues = [];
        //   let progressgroupValues = [];
        //   for (let j in this.responseData[i].batches) {
        //     performancegroupValues.push(
        //       parseInt(this.responseData[i].batches[j].performance)
        //     );
        //     progressgroupValues.push(
        //       parseInt(this.responseData[i].batches[j].progress)
        //     );
        //   }
        //   this.performanceDataSet.push({
        //     label: this.responseData[i].courseName,
        //     Group1: performancegroupValues[0],
        //     Group2: performancegroupValues[1],
        //     Group3: performancegroupValues[2]
        //   });
        //   this.progressDataSet.push({
        //     label: this.responseData[i].courseName,
        //     Group1: progressgroupValues[0],
        //     Group2: progressgroupValues[1],
        //     Group3: progressgroupValues[2]
        //   });
        // }
      });
  }
  ngOnInit() {
    this.getDataFromService();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterbody) {
      // this.getDataFromService();
    }
  }
}
