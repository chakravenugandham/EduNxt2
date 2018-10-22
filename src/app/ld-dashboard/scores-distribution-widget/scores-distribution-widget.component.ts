import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { LdDashboardService } from "../services/ld-dashboard.service";

import { _ } from "underscore";

import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: "app-scores-distribution-widget",
  templateUrl: "./scores-distribution-widget.component.html",
  styleUrls: ["./scores-distribution-widget.component.scss"]
})
export class ScoresDistributionWidgetComponent implements OnInit, OnDestroy {

  tooltipText: string;
  dataSubscription: Subscription;

  //filters data
  filtersData = {
    routeTo: "scoreDistributionFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: [],
    currentModule: '',
    appliedFilters: []
  };

  //response data
  responseData = [];

  //filter object defined
  testScoresObj = {
    filters: ["batch"],
    appliedFilters: [],
    responseData: []
  }

  testFilters = [];
  quizFilters = [];
  assignmentFilters = [];

  dataSet = [[0, 0], [20], [40], [60], [80], [100]];
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

  //testscore function defined
  testScoreFn() {
    this.tooltipText = 'Test Score';
    this.filtersData.currentModule = "test";
    this.filtersData.filterList = ["batch"];
    this.filtersData.appliedFilters = this.testFilters;
    localStorage.setItem("scoreComponent", this.filtersData.currentModule);
    this.getDataFromService();
  }

  //quizscore function defined
  quizScoreFn() {
    this.tooltipText = 'Quizzes';
    this.filtersData.currentModule = "quiz";
    this.filtersData.filterList = ["batch", "quiz"];
    this.filtersData.appliedFilters = this.quizFilters;
    localStorage.setItem("scoreComponent", this.filtersData.currentModule);
    this.getDataFromService();
  }

  //assignment function defined
  assignmentFn() {
    this.tooltipText = 'Assignments';
    this.filtersData.currentModule = "assignment";
    this.filtersData.filterList = ["batch", "assignment"];
    this.filtersData.appliedFilters = this.assignmentFilters;
    localStorage.setItem("scoreComponent", this.filtersData.currentModule);
    this.getDataFromService();
  }

  downloadPdf() {
    let htmlTemp = document.getElementById("score-distribution");
    console.log(htmlTemp);

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

  //service call for test,quiz,assignment
  getDataFromService() {
    this.responseData = [];
    this.spinner_loader = true;

    this.dataSubscription = this.dashboardService
      .getScoresDistrubution(this.filtersData.currentModule, this.filtersData.appliedFilters).subscribe((response: any) => {
        this.responseData = response.data;

        this.spinner_loader = false;
        this.noDataFlag = response.data.length == 0 ? true : false;

        for (let i = 1; i <= this.responseData.length; i++) {
          this.dataSet[i][1] = this.responseData[i - 1].numberOfUsers;
        }
      });
  }

  //filters function
  addFilters($event) {
    this.filtersData.appliedFilters = $event;
    this.getDataFromService();
  }

  ngOnInit() {
    this.testScoreFn();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
