import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

@Component({
  selector: "app-org-performance-widget",
  templateUrl: "./org-performance-widget.component.html",
  styleUrls: ["./org-performance-widget.component.scss"]
})
export class OrgPerformanceWidgetComponent implements OnInit {
  getTab: string = "teams";

  filtersData = {
    routeTo: "orgPerformanceFullView",
    filters: false,
    search: true,
    viewDetails: false,
    filterList: ["zone"],
    currentModule: this.getTab
  };

  searchFilterData = {
    searchComponent: "team-leaderboard",
    searchBy: "teamName"
  };

  responseData = [];

  actualResponseData = [];
  limitTo: number = 5;

  filterbody = {};

  searchFilterItem = [];

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

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

  teamsFn() {
    this.getTab = "teams";
    this.filtersData.currentModule = "teams";
    this.searchFilterData.searchComponent = "team-leaderboard";
    this.searchFilterData.searchBy = "teamName";
    this.getDataFromService();
  }
  trainersFn() {
    this.getTab = "trainers";
    this.filtersData.currentModule = "trainers";
    this.searchFilterData.searchComponent = "trainer-leaderboard";
    this.searchFilterData.searchBy = "trainerName";
    this.getDataFromService();
  }
  learnersFn() {
    this.getTab = "learner";
    this.filtersData.currentModule = "learner";
    this.searchFilterData.searchComponent = "learner-leaderboard";
    this.searchFilterData.searchBy = "learnerName";
    this.getDataFromService();
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.responseData = [];
    if (this.getTab == "teams") {
      this.dashboardService
        .getTeamData(this.limitTo)
        .subscribe((response: any) => {
          this.responseData = this.actualResponseData = response.data;
          this.spinner_loader = false;
          this.noDataFlag = this.responseData.length == 0 ? true : false;
        });
    } else if (this.getTab == "trainers") {
      this.dashboardService
        .getTrainersData(this.limitTo)
        .subscribe((response: any) => {
          this.responseData = this.actualResponseData = response.data;
          this.spinner_loader = false;
          this.noDataFlag = this.responseData.length == 0 ? true : false;
        });
    } else if ((this.getTab = "learner")) {
      this.dashboardService
        .getLearnerData(this.limitTo)
        .subscribe((response: any) => {
          this.responseData = this.actualResponseData = response.data;
          this.spinner_loader = false;
          this.noDataFlag = this.responseData.length == 0 ? true : false;
        });
    }
    // this.actualResponseData = this.responseData;
  }

  getSearchItem($event) {
    this.searchFilterItem = $event;
    for (let i in this.searchFilterItem) {
      this.searchFilterItem[i]["new"] = true;
    }
    this.responseData = JSON.parse(JSON.stringify(this.actualResponseData));

    if (this.searchFilterItem.length > 0)
      this.responseData.splice(-this.searchFilterItem.length);

    this.responseData = this.responseData.concat(this.searchFilterItem);
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
