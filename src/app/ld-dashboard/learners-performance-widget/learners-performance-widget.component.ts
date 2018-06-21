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
    this.batches = [];

    this.getData
      .getLearnerPerformanceData(this.filterbody)
      .subscribe((response: any) => {
        this.responseData = response.data;
        // this.batches.push(
        //   this.responseData[0].batches[0].batchName,
        //   this.responseData[0].batches[1].batchName,
        //   this.responseData[0].batches[2].batchName
        // );

        for (let b in this.responseData[0].batches) {
          this.batches.push(this.responseData[0].batches[b].batchName);
        }

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
            Group2: performancegroupValues[1],
            Group3: performancegroupValues[2]
          });
          this.progressDataSet.push({
            label: this.responseData[i].courseName,
            Group1: progressgroupValues[0],
            Group2: progressgroupValues[1],
            Group3: progressgroupValues[2]
          });
        }
        // this.testData = [
        //   { label: "ORACLE 1", Group1: 52, Group2: 56 },
        //   { label: "ORACLE 2", Group1: 42, Group2: 86 },
        //   { label: "ORACLE 3", Group1: 62, Group2: 26 },
        //   { label: "ORACLE 4", Group1: 32, Group2: 46 },
        //   { label: "ORACLE 7", Group1: 32, Group2: 46 },
        //   { label: "ORACLE 8", Group1: 32, Group2: 46 }
        // ];
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
