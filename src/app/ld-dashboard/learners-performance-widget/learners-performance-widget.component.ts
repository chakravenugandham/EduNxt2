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
        console.log("learnerPerformanceProgress Data", this.responseData);

        for (let i in this.responseData) {
          let batchOnePerformance:number;
          let batchTwoPerformance:number;
          let batchThreePerformance:number;
          let batchOneProgress:number;
          let batchTwoProgress:number;
          let batchThreeProgress:number;
          for (let j in this.responseData[i].batches){
            batchOnePerformance = this.responseData[i].batches[j].performance;
            batchTwoPerformance = this.responseData[i].batches[j].performance;
            batchOneProgress = this.responseData[i].batches[j].progress;
            batchTwoProgress = this.responseData[i].batches[j].progress;
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
          // for (let j in this.responseData[i].batches) {
          //   this.performanceDataSet.push({
          //     Group1: this.responseData[i].batches[j].performance,
          //     Group2: this.responseData[i].batches[j].performance
          //   });
          //   this.progressDataSet.push({
          //     Group1: this.responseData[i].batches[j].progress,
          //     Group2: this.responseData[i].batches[j].progress
          //   });
          // }
        }

        console.log("this.performanceDataSet",this.performanceDataSet);
        console.log("this.progressDataSet",this.progressDataSet);
        


        // for (let key in this.responseData) {
        //   let lableName = this.responseData[key][0].courseName;
        //   let batchName = this.responseData[key][0].batchName;
        //   console.log("lableName", lableName);
        //   console.log("batchName", batchName);
        //   console.log("key", this.responseData[key]);
        //   for(let i in this.responseData[key]){
        //     let Group1 = this.responseData[key][i].performance;
        //     console.log("Group1", Group1);
        //   }
        // }
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
    if(changes.filterbody){
      console.log("body changed");
      this.getDataFromService();
    }
  }
}
