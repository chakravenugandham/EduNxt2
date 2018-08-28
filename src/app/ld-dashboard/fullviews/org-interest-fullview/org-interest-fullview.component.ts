import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-org-interest-fullview",
  templateUrl: "./org-interest-fullview.component.html",
  styleUrls: ["./org-interest-fullview.component.scss"]
})
export class OrgInterestFullviewComponent implements OnInit {
  //global variable declarations
  responseData = [];
  filterbody = {};
  filtersData = {
    routeTo: "orgInterestFullView",
    filters: false,
    search: false,
    viewDetails: false,
    filterList: ["zone"],
    viewDetailsFilters: false
  };

  sortOrder: string = "learnerName";
  reverse: boolean = false;
  searchBox: boolean = false;


  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  searchFilterData = {
    searchComponent: "content-consumption",
    searchBy: "contentName"
  };

  searchString: string = "";

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0,
    total_pages: 0
  };

  //dropdown display values
  displayFor = {};

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


  getDisplayObject($event) {
    this.displayFor = $event;
  }

  //api call for orgDetails based on component
  getDataFromService() {
    this.spinner_loader = true;
    this.responseData = [];
    this.dashboardService.getOrgInterestDetailsData(this.searchFilterData, this.searchString, this.pagination).subscribe((response: any) => {
      this.responseData = response.data;
      this.pagination.total = response.pagination.total;
      this.pagination.total_pages = response.pagination.total_pages;

      this.spinner_loader = false;
      this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
    });
  }

  gotoPage($event) {
    this.pagination.page = $event;
    this.getDataFromService();
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
