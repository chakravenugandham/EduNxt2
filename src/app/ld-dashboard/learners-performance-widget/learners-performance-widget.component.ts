import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

import { _ } from "underscore";

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
      let imgWidth = 208;
      let pageHeight = 295;
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

    this.dashboardService
      .getLearnerPerformanceData(this.getTab).subscribe((response: any) => {
        this.responseData = response.data;

        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;

        for (let i in this.responseData) {
          if (this.getTab == "performance") {
            this.performanceDataSet.push({
              label: this.responseData[i].sectionName,
              Group1: this.responseData[i].performance = this.responseData[i].performance > 100 ? 100 : this.responseData[i].performance
            });
          } else if (this.getTab == "progress") {
            this.progressDataSet.push({
              label: this.responseData[i].sectionName,
              Group1: this.responseData[i].progress = this.responseData[i].progress > 100 ? 100 : this.responseData[i].progress
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
    this.progressFn();
  }
}
