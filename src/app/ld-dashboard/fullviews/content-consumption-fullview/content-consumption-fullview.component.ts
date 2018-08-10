import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-content-consumption-fullview",
  templateUrl: "./content-consumption-fullview.component.html",
  styleUrls: ["./content-consumption-fullview.component.scss"]
})
export class ContentConsumptionFullviewComponent implements OnInit {
  contentData = [];
  filterbody = {};
  pagination = {
    page: 1,
    limitTo: 10,
    total: 0
  };
  sortOrder: string = "contentName";
  reverse: boolean = false;
  searchBox: boolean = false;
  paginationData = {};
  sub: any;
  filtersData = {
    routeTo: "contentConsumptionFullView",
    filters: true,
    search: false,
    viewDetails: false,
    filterList: ["contentType"],
    viewDetailsFilters: true
  };
  // page: number;
  total_records: number;
  // selectPage: string;

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(private dashboardService: LdDashboardService, private route: ActivatedRoute) {
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

  searchFn() {
    this.searchBox = true;
  }

  closeSearchFn() {
    this.searchBox = false;
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    this.reverse = !this.reverse;
  }

  goToPage(pageNo) {
    this.pagination.page = pageNo;
    this.getDataFromService();
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.dashboardService
      .getContentData(this.filterbody, this.pagination)
      .subscribe((response: any) => {
        this.contentData = response.data;

        this.spinner_loader = false;
        this.noDataFlag = response.data.length == 0 ? true : false;

        this.pagination.total = response.pagination.total_pages;
        this.paginationData = response.pagination;
        // this.page = this.paginationData["page"];
        this.total_records = this.paginationData["total"];
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
