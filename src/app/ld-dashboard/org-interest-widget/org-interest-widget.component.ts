import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";


import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

import { _ } from "underscore";

@Component({
  selector: "app-org-interest-widget",
  templateUrl: "./org-interest-widget.component.html",
  styleUrls: ["./org-interest-widget.component.scss"]
})
export class OrgInterestWidgetComponent implements OnInit {
  routePath: string = "orgInterestFullView";
  filtersData = {
    routeTo: "orgInterestFullView",
    filters: false,
    search: true,
    viewDetails: true,
    filterList: [],
    appliedFilters: [],
  };

  searchFilterData = {
    searchComponent: "organization-interests",
    searchBy: "courseName",
    searchCount: "3"
  };

  filterbody = {};
  orgData: any[];
  orgPopularTopicData: any[];
  actualResponseData: any[];

  // searchFilterItem = [];

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.orgData = [];
    this.dashboardService.getOrgInterestData().subscribe((res: any) => {
      this.orgData = this.actualResponseData = res.data;
      this.spinner_loader = false;
      this.noDataFlag = this.orgData.length == 0 ? true : false;
    });

    this.dashboardService
      .getOrgPopulatTopicsData()
      .subscribe((response: any) => {
        this.orgPopularTopicData = response.data;
      });
  }

  downloadPdf() {
    let htmlTemp = document.getElementById("org-interest");
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

      pdf.save('MYPdf.pdf'); // Generated PDF   
    });

  }

  getSearchItem($event) {
    this.filtersData.appliedFilters = $event;

    for (let i in this.filtersData.appliedFilters) {
      this.filtersData.appliedFilters[i]["new"] = true;
    }

    this.orgData = JSON.parse(JSON.stringify(this.actualResponseData));

    if (this.filtersData.appliedFilters.length > 0)
      this.orgData.splice(-this.filtersData.appliedFilters.length);

    this.orgData = this.orgData.concat(this.filtersData.appliedFilters);
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
