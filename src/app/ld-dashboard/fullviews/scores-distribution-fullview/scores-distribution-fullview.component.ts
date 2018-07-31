import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-scores-distribution-fullview",
  templateUrl: "./scores-distribution-fullview.component.html",
  styleUrls: ["./scores-distribution-fullview.component.scss"]
})
export class ScoresDistributionFullviewComponent implements OnInit {
  responseScoreDetails: any;
  responseGraphData: any;

  dataSet = [[0, 0], [20], [40], [60], [80], [100], [110, 0]];

  showDetails: string = "test";
  sortOrder: string = "learnerName";
  searchBox: boolean = false;
  page: number;
  total_records: number;
  selectPage: string;
  paginationData = {};

  filterbody = {};
  filtersData = {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    viewDetails: false,
    filterList: ["batch"],
    viewDetailsFilters: true
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

  // onSearchChange(searchValue: string) {
  //   console.log(searchValue);
  // }

  goToPage(v) {
    this.selectPage = v;
    console.log(this.selectPage);
    alert("hello");
  }

  getDataFromService() {
    this.dashboardService
      .getScoresDetails(this.showDetails, this.filterbody)
      .subscribe((response: any) => {
        this.responseScoreDetails = response.data;
        this.paginationData = response.pagination;
        this.page = this.paginationData['page'];
        this.total_records = this.paginationData['total'];
        //console.log(this.paginationData);
      });
    this.dashboardService
      .getScoresDistrubution(this.showDetails, this.filterbody)
      .subscribe((res: any) => {
        this.responseGraphData = res.data;
        for (let i = 1; i <= this.responseGraphData.length; i++) {
          this.dataSet[i][1] = this.responseGraphData[i - 1].numberOfUsers;
        }
        this.dataSet = [...this.dataSet];
      });
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
  }

  //api call for score details based on component
  ngOnInit() {
    this.getDataFromService();
  }
}
