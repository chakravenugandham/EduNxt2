import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-scores-distribution-fullview",
  templateUrl: "./scores-distribution-fullview.component.html",
  styleUrls: ["./scores-distribution-fullview.component.scss"]
})
export class ScoresDistributionFullviewComponent implements OnInit {

  filtersData = {
    routeTo: "scoreDistributionFullView",
    filters: true,
    search: false,
    viewDetails: false,
    viewDetailsFilters: true,
    filterList: ["batch"],
    currentModule: '',
    appliedFilters: []
  };

  moduleName: string;

  responseGraphData = [];
  responseScoreDetails = [];

  dataSet = [[0, 0], [20], [40], [60], [80], [100]];

  sortOrder: string = "learnerName";
  reverse: boolean = false;
  searchBox: boolean = false;

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0
  };

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

  getDataFromService() {
    // this.responseGraphData = [];

    this.dashboardService
      .getScoresDistrubution(this.moduleName, this.filtersData.appliedFilters)
      .subscribe((response: any) => {
        this.responseGraphData = response.data;
        for (let i = 1; i <= this.responseGraphData.length; i++) {
          this.dataSet[i][1] = this.responseGraphData[i - 1].numberOfUsers;
        }
        this.dataSet = [...this.dataSet];
      });
  }

  getScoreDetails() {
    // this.responseScoreDetails = [];
    this.spinner_loader = true;

    this.dashboardService
      .getScoresDetails(this.moduleName, this.filtersData.appliedFilters, this.pagination)
      .subscribe((response: any) => {
        this.responseScoreDetails = response.data;
        this.pagination.total = response.pagination.total;

        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
      });
  }

  changeModule(module) {
    this.moduleName = module;
    localStorage.setItem('scoreComponent', module);
    this.getDataFromService();
    this.getScoreDetails();
  }

  gotoPage($event) {
    this.pagination.page = $event;
    this.getScoreDetails();
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    this.reverse = !this.reverse;
  }

  searchFn() {
    this.searchBox = true;
  }

  closeSearchFn() {
    this.searchBox = false;
  }

  //api call for score details based on component
  ngOnInit() {
    this.moduleName = localStorage.getItem('scoreComponent');
    this.getDataFromService();
    this.getScoreDetails();
  }
}
