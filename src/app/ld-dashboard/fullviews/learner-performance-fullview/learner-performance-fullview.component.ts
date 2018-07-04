import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-learner-performance-fullview",
  templateUrl: "./learner-performance-fullview.component.html",
  styleUrls: ["./learner-performance-fullview.component.scss"]
})
export class LearnerPerformanceFullviewComponent implements OnInit {
  selectedGraph: string = "performance";
  learnerData = [];
  responseData = [];
  batches = [];
  graphData = [];
  filterbody = {};
  filtersData = {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    viewDetails: false,
    filterList: ["batch"],
    viewDetailsFilters: true
  };

  constructor(private contentService: LdDashboardService) {
    this.contentService.refreshAPI.subscribe(result => {
      this.getDataFromService();
      this.getDataForGraph();
    });
  }

  onchange(componentName) {
    this.selectedGraph = componentName;
    this.getDataForGraph();
  }

  getDataFromService() {
    this.contentService
      .getLearnerPerformanceDetails(this.filterbody)
      .subscribe((response: any) => {
        this.learnerData = response.data;
      });
  }
  getDataForGraph() {
    let performanceDataSet = [];
    let progressDataSet = [];
    this.contentService
      .getLearnerPerformanceData(this.filterbody)
      .subscribe((response: any) => {
        this.responseData = response.data;

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
          performanceDataSet.push({
            label: this.responseData[i].courseName,
            Group1: performancegroupValues[0],
            Group2: performancegroupValues[1],
            Group3: performancegroupValues[2]
          });

          progressDataSet.push({
            label: this.responseData[i].courseName,
            Group1: progressgroupValues[0],
            Group2: progressgroupValues[1],
            Group3: progressgroupValues[2]
          });
        }

        this.graphData =
          this.selectedGraph == "performance"
            ? performanceDataSet
            : progressDataSet;
      });
  }

  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
    this.getDataForGraph();
  }

  ngOnInit() {
    this.getDataFromService();
    this.getDataForGraph();
  }
}
