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
    search: true,
    viewDetails: false,
    filterList: ["zone"],
    viewDetailsFilters: false
  };

  sortOrder: string = "learnerName";
  reverse: boolean = false;
  searchBox: boolean = false;
  page: number;
  total_records: number;
  selectPage: string;
  paginationData = {};

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

  goToPage(v) {
    this.selectPage = v;
    alert("hello");
  }

  getDisplayObject($event) {
    this.displayFor = $event;
  }

  //api call for orgDetails based on component
  getDataFromService() {
    this.dashboardService.getOrgInterestDetailsData().subscribe((res: any) => {
      this.responseData = res.data;
      this.paginationData = res.pagination;
      this.page = this.paginationData["page"];
      this.total_records = this.paginationData["total"];
    });
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
