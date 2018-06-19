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
    filterList: ["zone"]
  };
  getTab: string = "performance";
  responseData = [];
  filterbody = {};
  performanceDataSet = [];
  progressDataSet = [];
  batches = [];

  constructor(private getData: LdDashboardService) {}

  performanceFn() {
    this.getTab = "performance";
  }
  progressFn() {
    this.getTab = "progress";
  }
  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }

  getDataFromService() {
    this.getData
      .getLearnerPerformanceData(this.filterbody)
      .subscribe((response: any) => {
        this.responseData = response.data;

        this.batches.push(
          this.responseData[0].batches[0].batchName,
          this.responseData[0].batches[0].batchName,
          this.responseData[0].batches[0].batchName
        );

        for (let i in this.responseData) {
          let performancegroupValues = [];
          let progressgroupValues = [];
          for (let j in this.responseData[i].batches) {
            performancegroupValues.push(
              parseInt(this.responseData[i].batches[j].performance)
            );
            progressgroupValues.push(
              parseInt(this.responseData[i].batches[j].progress)
            );
          }
          this.performanceDataSet.push({
            label: this.responseData[i].courseName,
            Group1: performancegroupValues[0],
            // Group2: performancegroupValues[0],
            Group3: performancegroupValues[0]
          });
          this.progressDataSet.push({
            label: this.responseData[i].courseName,
            Group1: progressgroupValues[0],
            // Group2: progressgroupValues[0],
            Group3: progressgroupValues[0]
          });
        }
      });
  }
  ngOnInit() {
    this.getDataFromService();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterbody) {
      this.getDataFromService();
    }
  }
}
