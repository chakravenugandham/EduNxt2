import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-content-consumption-fullview",
  templateUrl: "./content-consumption-fullview.component.html",
  styleUrls: ["./content-consumption-fullview.component.scss"]
})
export class ContentConsumptionFullviewComponent implements OnInit {

  filtersData = {
    routeTo: "contentConsumptionFullView",
    filters: true,
    search: false,
    viewDetails: false,
    filterList: ["contentType"],
    viewDetailsFilters: true,
    currentModule: '',
    appliedFilters: []
  };

  contentData = [];

  searchFilterData = {
    searchBy: "contentName"
  };

  searchString: string = "";

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0,
    total_pages: 0
  };

  sortOrder: string = "contentName";
  order: string = 'desc';
  sortFlag: boolean = false;
  searchBox: boolean = false;

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(private dashboardService: LdDashboardService, private route: ActivatedRoute) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService(this.sortOrder);
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService(this.sortOrder);
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService(this.sortOrder);
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService(this.sortOrder);
    });
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    this.order = this.sortFlag ? 'asc' : 'desc';
    this.getDataFromService(sortByName);
    //this.reverse = !this.reverse;
  }

  getDataFromService(sortByName) {
    this.spinner_loader = true;
    this.contentData = [];
    // (<HTMLInputElement>document.getElementById("searchString")).disabled = true;
    this.dashboardService
      .getContentData(this.searchFilterData, this.searchString, this.filtersData.appliedFilters, this.pagination, sortByName, this.order)
      .subscribe((response: any) => {
        this.contentData = response.data;
        // (<HTMLInputElement>document.getElementById("searchString")).disabled = false;
        this.pagination.total = response.pagination.total;
        this.pagination.total_pages = response.pagination.total_pages;
        this.spinner_loader = false;
        this.noDataFlag = response.data.length == 0 ? true : false;
      });
  }

  gotoPage($event) {
    this.pagination.page = $event;
    this.getDataFromService(this.sortOrder);
  }

  addFilters($event) {
    this.filtersData.appliedFilters = $event;
    this.getDataFromService(this.sortOrder);
  }

  ngOnInit() {
    this.getDataFromService(this.sortOrder);
  }
}
