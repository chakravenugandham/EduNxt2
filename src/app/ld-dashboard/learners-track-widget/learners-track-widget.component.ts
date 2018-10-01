import { Component, OnInit } from "@angular/core";

import { LdDashboardService } from "../services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

import { _ } from "underscore";
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';


@Component({
  selector: "app-learners-track-widget",
  templateUrl: "./learners-track-widget.component.html",
  styleUrls: ["./learners-track-widget.component.scss"]
})
export class LearnersTrackWidgetComponent implements OnInit {

  tooltipText: string = '';

  //filter object
  filtersData = {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["batch"],
    currentModule: '',
    appliedFilters: []
  };


  //pace object defined
  paceObject = {
    filters: ["batch"],
    appliedFilters: [],
    responseData: []
  }

  //performance object defined
  performanceObject = {
    filters: ["batch"],
    appliedFilters: [],
    responseData: []
  }

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  myStorage = window.localStorage;

  constructor(private dashboardService: LdDashboardService, private filterData: CommonService) {
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

  //learnerpace function
  learnerPaceFn() {
    this.tooltipText = 'Pace';
    this.filtersData.currentModule = "pace";
    localStorage.setItem("trackComponent", this.filtersData.currentModule);
    this.filtersData.appliedFilters = this.paceObject.appliedFilters;
    this.getDataFromService();
  }

  //learner performance function
  learnerPerfFn() {
    this.tooltipText = 'Performance';
    this.filtersData.currentModule = "performance";
    localStorage.setItem("trackComponent", this.filtersData.currentModule);
    this.filtersData.appliedFilters = this.performanceObject.appliedFilters;
    this.getDataFromService();
  }

  downloadPdf() {
    let htmlTemp = document.getElementById("learner-track");
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

  //service call for apis
  getDataFromService() {
    this.spinner_loader = true;
    this.dashboardService.getLearnerTrackData(this.filtersData.appliedFilters).subscribe((response: any) => {
      this.spinner_loader = false;

      this.paceObject.responseData = response.data.paceData;
      this.performanceObject.responseData = response.data.performanceData;

      if (this.filtersData.currentModule == "pace") {
        this.noDataFlag = _.isEmpty(this.paceObject.responseData) ? true : false;
      }
      else if (this.filtersData.currentModule == "performance") {
        this.noDataFlag = _.isEmpty(this.performanceObject.responseData) ? true : false;
      }
    });
  }

  //filters function
  addFilters($event) {
    this.filtersData.appliedFilters = $event;
    this.getDataFromService();
  }

  ngOnInit() {
    this.learnerPaceFn();
  }
}
