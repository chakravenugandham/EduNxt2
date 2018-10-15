import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";

import { _ } from "underscore";

import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: "app-learners-performance-widget",
  templateUrl: "./learners-performance-widget.component.html",
  styleUrls: ["./learners-performance-widget.component.scss"]
})
export class LearnersPerformanceWidgetComponent implements OnInit {

  tooltipText: string;

  //filter object defined
  filtersData = {
    routeTo: "learnerPerformanceFullView",
    filters: false,
    search: false,
    viewDetails: false,
    filterList: []
  };
  // filterName = ["batch"];
  getTab: string = "performance";
  responseData = [];
  filterbody = {};
  performanceDataSet = [];
  progressDataSet = [];
  batches = [];
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

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

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  //performance function
  performanceFn() {
    this.tooltipText = 'performance';
    this.getTab = "performance";
    this.getDataFromService();
  }

  //progress function
  progressFn() {
    this.tooltipText = 'progress';
    this.getTab = "progress";
    this.getDataFromService();
  }

  //filter object function
  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }

  downloadPdf() {
    let htmlTemp = document.getElementById("learner-performance");
    html2canvas(htmlTemp).then(canvas => {
      // Few necessary setting options  
      let imgWidth = 200;
      let pageHeight = 200;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('./');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

      pdf.save('EduNxtReport.pdf'); // Generated PDF   
    });

  }

  testData = [];

  //service call for apis
  getDataFromService() {
    this.performanceDataSet = [];
    this.progressDataSet = [];
    this.spinner_loader = true;

    this.dashboardService.getLearnerPerformanceData(this.getTab).subscribe((response: any) => {
      this.responseData = response.data;

      this.spinner_loader = false;
      this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;

      for (let i in this.responseData) {
        if (this.getTab == "performance") {
          this.performanceDataSet.push({
            label: this.responseData[i].sectionName,
            Group1: this.responseData[i].actualPerformance = this.responseData[i].actualPerformance > 100 ? 100 : this.responseData[i].actualPerformance,
            Group2: this.responseData[i].expectedPerformance = this.responseData[i].expectedPerformance > 100 ? 100 : this.responseData[i].expectedPerformance
          });
        } else if (this.getTab == "progress") {
          this.progressDataSet.push({
            label: this.responseData[i].sectionName,
            Group1: this.responseData[i].actualProgress = this.responseData[i].actualProgress > 100 ? 100 : this.responseData[i].actualProgress,
            Group2: this.responseData[i].expectedProgress = this.responseData[i].expectedProgress > 100 ? 100 : this.responseData[i].expectedProgress
          });
        }
      }
    });
  }
  ngOnInit() {
    this.progressFn();
  }
}
