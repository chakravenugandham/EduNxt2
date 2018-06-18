import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { observable } from "rxjs";
import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-learners-performance-widget",
  templateUrl: "./learners-performance-widget.component.html",
  styleUrls: ["./learners-performance-widget.component.scss"]
})
export class LearnersPerformanceWidgetComponent implements OnInit, OnChanges {
  routePath: string = "learnerPerformanceFullView";
  filtersData = {
    routeTo: "learnerPerformanceFullView",
    filters: true,
    search: false,
    viewDetails: true,
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
  filterbody = {};
  performanceDataSet = [];
  progressDataSet = [];
  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
    console.log("this.filterbody", this.filterbody);
  }

  getDataFromService() {
    this.getData
      .getLearnerPerformanceData(this.filterbody)
      .subscribe((response: any) => {
        this.responseData = response.data;
        for (let i in this.responseData) {
          let batchOnePerformance: number;
          let batchTwoPerformance: number;
          let batchThreePerformance: number;
          let batchOneProgress: number;
          let batchTwoProgress: number;
          let batchThreeProgress: number;
          for (let j in this.responseData[i].batches) {
            batchOnePerformance = parseFloat(this.responseData[i].batches[j].performance);
            batchTwoPerformance = parseFloat(this.responseData[i].batches[j].performance);
            batchOneProgress = parseFloat(this.responseData[i].batches[j].progress);
            batchTwoProgress = parseFloat(this.responseData[i].batches[j].progress);
          }
          this.performanceDataSet.push({
            label: this.responseData[i].courseName,
            Group1: batchOnePerformance,
            Group2: batchTwoPerformance,
            Group3: batchTwoPerformance
          });
          this.progressDataSet.push({
            label: this.responseData[i].courseName,
            Group1: batchOneProgress,
            Group2: batchTwoProgress,
            Group3: batchTwoProgress
          });
        }
        console.log("performanceDataSet",this.performanceDataSet);
        
      });
  }

  constrcutGrpah() {
    for (let key in this.responseData) {
      let lableName = this.responseData[key[0]].courseName;
      console.log("lableName", lableName);
    }
  }
  ngOnInit() {
    this.getDataFromService();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterbody) {
      console.log("body changed");
      this.getDataFromService();
    }
  }
}
