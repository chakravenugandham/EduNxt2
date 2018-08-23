import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

@Component({
  selector: "app-content-performance-widget",
  templateUrl: "./content-performance-widget.component.html",
  styleUrls: ["./content-performance-widget.component.scss"]
})
export class ContentPerformanceWidgetComponent implements OnInit {
  routePath: string = "contentConsumptionFullView";
  // limitTo = 5;
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
    filterList: [],
    viewDetailsFilters: false
  };
  filterName = ["contentType"];
  filterbody = {};
  contentData = [];

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
    this.contentData = [];
    this.dashboardService
      .getContentData(this.filterbody, this.pagination)
      .subscribe((res: any) => {
        this.contentData = res.data;
        this.spinner_loader = false;
        this.noDataFlag = this.contentData.length == 0 ? true : false;
      });
  }

  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
