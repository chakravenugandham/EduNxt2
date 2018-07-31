import { Component, OnInit } from "@angular/core";
import { observable } from "rxjs";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-org-interest-fullview",
  templateUrl: "./org-interest-fullview.component.html",
  styleUrls: ["./org-interest-fullview.component.scss"]
})
export class OrgInterestFullviewComponent implements OnInit {
  //global variable declarations
  responseData = [];
  filtersData = {
    routeTo: "orgInterestFullView",
    filters: false,
    search: true,
    viewDetails: true,
    filterList: ["zone"]
  };

  sortOrder: string = "learnerName";
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
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
