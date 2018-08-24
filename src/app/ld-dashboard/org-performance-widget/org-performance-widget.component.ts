import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

@Component({
  selector: "app-org-performance-widget",
  templateUrl: "./org-performance-widget.component.html",
  styleUrls: ["./org-performance-widget.component.scss"]
})
export class OrgPerformanceWidgetComponent implements OnInit {
  // componentName: string = "learner";

  filtersData = {
    routeTo: "orgPerformanceFullView",
    filters: false,
    search: true,
    viewDetails: true,
    filterList: ["zone"],
    currentModule: ""
  };

  searchFilterData = {
    searchComponent: "learner-leaderboard",
    searchBy: "learnerName"
  };

  responseData = [];

  actualResponseData = [];
  // limitTo: number = 5;

  filterbody = {};

  searchFilterItem = [];
  teamsSearchItems = [];
  trainersSearchItems = [];
  learnersSearchItems = [];

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  pagination = {
    limitTo: 5
  };

  constructor(private dashboardService: LdDashboardService, private filterData: CommonService) {
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

    // this.myStorage.setItem('orgPerformanceCurrentModule', this.filtersData.currentModule);

  }

  teamsFn() {
    this.filtersData.currentModule = "teams";
    // this.filterData.orgPerformanceDetails = this.filtersData;
    this.searchFilterData.searchComponent = "team-leaderboard";
    this.searchFilterData.searchBy = "teamName";
    this.searchFilterItem = this.teamsSearchItems;
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.getDataFromService();
  }
  trainersFn() {
    this.filtersData.currentModule = "trainers";
    // this.filterData.orgPerformanceDetails = this.filtersData;
    this.searchFilterData.searchComponent = "trainer-leaderboard";
    this.searchFilterData.searchBy = "trainerName";
    this.searchFilterItem = this.trainersSearchItems;
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.getDataFromService();
  }
  learnersFn() {
    this.filtersData.currentModule = "learner";
    // this.filterData.orgPerformanceDetails = this.filtersData;
    this.searchFilterData.searchComponent = "learner-leaderboard";
    this.searchFilterData.searchBy = "learnerName";
    this.searchFilterItem = this.learnersSearchItems;
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.getDataFromService();
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.responseData = [];

    if (this.filtersData.currentModule == "teams") {
      this.dashboardService
        .getTeamData(this.pagination)
        .subscribe((response: any) => {
          this.responseData = this.actualResponseData = response.data;
          this.spinner_loader = false;
          this.noDataFlag = this.responseData.length == 0 ? true : false;
        });
    }

    else if (this.filtersData.currentModule == "trainers") {
      this.dashboardService
        .getTrainersData(this.pagination)
        .subscribe((response: any) => {
          this.responseData = this.actualResponseData = response.data;
          this.spinner_loader = false;
          this.noDataFlag = this.responseData.length == 0 ? true : false;
        });
    }

    else if ((this.filtersData.currentModule = "learner")) {
      this.dashboardService
        .getLearnerData(this.pagination)
        .subscribe((response: any) => {
          this.responseData = this.actualResponseData = response.data;
          this.spinner_loader = false;
          this.noDataFlag = this.responseData.length == 0 ? true : false;
        });
    }

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
    // this.filterData.orgPerformanceDetails = this.filtersData;
    // this.searchFilterItem = this.learnersSearchItems;
    this.learnersFn();
    // this.getDataFromService();
  }
}
