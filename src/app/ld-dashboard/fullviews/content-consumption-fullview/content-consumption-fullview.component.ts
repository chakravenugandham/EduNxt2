import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";
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
    console.log("this.pagination.page", this.pagination.page);
    this.getDataFromService();
  }

  getDataFromService() {
    this.dashboardService
      .getContentData(this.filterbody, this.pagination)
      .subscribe((res: any) => {
        this.contentData = res.data;
        this.pagination.total = res.pagination.total_pages;
        this.paginationData = res.pagination;
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
