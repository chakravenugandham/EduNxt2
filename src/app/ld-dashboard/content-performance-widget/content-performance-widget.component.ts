import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

import { _ } from "underscore";

@Component({
  selector: "app-content-performance-widget",
  templateUrl: "./content-performance-widget.component.html",
  styleUrls: ["./content-performance-widget.component.scss"]
})
export class ContentPerformanceWidgetComponent implements OnInit {

  pagination = {
    page: 1,
    limitTo: 5,
    total: 0
  };

  filtersData = {
    routeTo: "contentConsumptionFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["contentType"],
    viewDetailsFilters: false,
    appliedFilters: []
  };

  contentObject = {
    filters: ["contentType"],
    appliedFilters: [],
    responseData: []
  }

  searchFilterData = {
    searchComponent: "content-consumption",
    searchBy: "contentName"
  };

  searchString: string = "";

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(private dashboardService: LdDashboardService, private commonService: CommonService) {
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

  getDataFromService() {
    this.spinner_loader = true;
    this.dashboardService
      .getContentData(this.searchFilterData, this.searchString, this.filtersData.appliedFilters, this.pagination)
      .subscribe((res: any) => {
        this.contentObject.responseData = res.data;

        this.spinner_loader = false;
        this.noDataFlag = this.contentObject.responseData.length == 0 ? true : false;
      });
  }

  addFilters($event) {
    this.filtersData.appliedFilters = $event;
    this.getDataFromService();
  }

  ngOnInit() {
    this.filtersData.appliedFilters = this.contentObject.appliedFilters;
    this.getDataFromService();
  }
}
