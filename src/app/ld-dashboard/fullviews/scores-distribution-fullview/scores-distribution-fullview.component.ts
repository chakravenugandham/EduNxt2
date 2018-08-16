import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-scores-distribution-fullview",
  templateUrl: "./scores-distribution-fullview.component.html",
  styleUrls: ["./scores-distribution-fullview.component.scss"]
})
export class ScoresDistributionFullviewComponent implements OnInit {
  responseGraphData = [];
  responseScoreDetails = [];

  dataSet = [[0, 0], [20], [40], [60], [80], [100]];

  showDetails: string = "test";
  sortOrder: string = "learnerName";
  reverse: boolean = false;
  searchBox: boolean = false;
  page: number;
  total_records: number;
  selectPage: string;
  paginationData = {};

  filterbody = {};
  filtersData = {
    routeTo: "scoreDistributionFullView",
    filters: true,
    search: false,
    viewDetails: false,
    filterList: ["batch"],
    viewDetailsFilters: true
  };

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0
  };

  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }
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

  getDataFromService() {
    this.responseGraphData = [];

    this.dashboardService
      .getScoresDistrubution(this.showDetails, this.filterbody)
      .subscribe((response: any) => {
        this.responseGraphData = response.data;

        for (let i = 1; i <= this.responseGraphData.length; i++) {
          this.dataSet[i][1] = this.responseGraphData[i - 1].numberOfUsers;
        }
        this.dataSet = [...this.dataSet];
      });
  }

  getScoreDetails() {
    this.responseScoreDetails = [];
    this.spinner_loader = true;

    this.dashboardService
      .getScoresDetails(this.showDetails, this.filterbody, this.pagination)
      .subscribe((response: any) => {
        this.responseScoreDetails = response.data;
        this.pagination.total = response.pagination.total;

        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
      });
  }

  gotoPage($event) {
    this.pagination.page = $event;
    this.getScoreDetails();
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    this.reverse = !this.reverse;
  }

  //api call for score details based on component
  ngOnInit() {
    this.getDataFromService();
    this.getScoreDetails();
  }
}
