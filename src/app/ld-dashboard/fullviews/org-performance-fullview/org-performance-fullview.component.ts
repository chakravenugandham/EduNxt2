import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { CommonService } from "../../../common-services/common.service";

import { _ } from "underscore";

@Component({
  selector: "app-org-performance-fullview",
  templateUrl: "./org-performance-fullview.component.html",
  styleUrls: ["./org-performance-fullview.component.scss"]
})
export class OrgPerformanceFullviewComponent implements OnInit {
  // responseTeamsDetails: any;
  // responseTrainersDetails: any;
  // responseLeanersDetails: any;

  responseData: any[];

  checkBoxValue: boolean = false;
  sortOrder: string;
  reverse: boolean = false;

  searchBox: boolean = false;

  showDetails: string;
  componentName: string;
  compareUsers = [];

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0,
    total_pages: 0
  };

  searchFilterData = {
    searchComponent: "learner-leaderboard",
    searchBy: "learnerName"
  };

  parseFloat = parseFloat;

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(
    private dashboardService: LdDashboardService,
    private filterData: CommonService
  ) {
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

  //api calls for trainers ,teams and learner
  getDataFromService() {
    this.spinner_loader = true;

    if (this.componentName == "teams") {
      this.dashboardService.getTeamData(this.pagination).subscribe((response: any) => {
        this.responseData = response.data;
        // this.responseTeamsDetails = response.data;
        this.pagination.total = response.pagination.total;
        this.pagination.total_pages = response.pagination.total_pages;

        this.spinner_loader = false;
        this.noDataFlag = response.data.length == 0 ? true : false;
      });
    }

    else if (this.componentName == "trainers") {
      this.dashboardService.getTrainersData(this.pagination).subscribe((response: any) => {
        this.responseData = response.data;
        // this.responseTrainersDetails = response.data;
        this.pagination.total = response.pagination.total;
        this.pagination.total_pages = response.pagination.total_pages;

        this.spinner_loader = false;
        this.noDataFlag = response.data.length == 0 ? true : false;
      });
    }

    else if (this.componentName == "learner") {
      this.dashboardService.getLearnerData(this.pagination).subscribe((response: any) => {
        this.responseData = response.data;
        // this.responseLeanersDetails = response.data;
        this.pagination.total = response.pagination.total;
        this.pagination.total_pages = response.pagination.total_pages;

        this.spinner_loader = false;
        this.noDataFlag = response.data.length == 0 ? true : false;
      });
    }

  }

  gotoPage($event) {
    this.pagination.page = $event;
    this.getDataFromService();
  }

  selectToCompare(user) {
    if (_.findIndex(this.compareUsers, user) == -1) {
      this.compareUsers.push(user);
    }
    else {
      this.compareUsers.splice(_.findIndex(this.compareUsers, user), 1)
    }
  }

  clearSelected() {
    this.compareUsers = [];
    this.pagination.page = 1;
    this.getDataFromService();
  }

  checkItemInApplied(item) {
    let itemFound = (_.findIndex(this.compareUsers, item) == -1) ? false : true;
    return itemFound;
  }

  compareSelected() {
    this.responseData = this.compareUsers;
    console.log("compareUsers", this.compareUsers.length);
  }

  searchItem($event) {
    this.dashboardService
      .getSearchFilterData(this.searchFilterData, $event.target.value)
      .subscribe((respose: any) => {
        this.responseData = respose.data;
      });
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    this.reverse = !this.reverse;
  }

  changeData(name) {
    this.componentName = name;
    localStorage.setItem('orgPerformaModule', name);
    this.pagination.page = 1;
    this.compareUsers = [];
    if (this.componentName == "teams") {
      this.searchFilterData.searchComponent = "team-leaderboard";
      this.searchFilterData.searchBy = "teamName";
    }
    if (this.componentName == "trainers") {
      this.searchFilterData.searchComponent = "trainer-leaderboard";
      this.searchFilterData.searchBy = "trainerName";
    }
    if (this.componentName == "learner") {
      this.searchFilterData.searchComponent = "learner-leaderboard";
      this.searchFilterData.searchBy = "learnerName";
    }
    this.getDataFromService();
  }


  ngOnInit() {
    this.componentName = this.showDetails = localStorage.getItem('orgPerformaModule');
    this.getDataFromService();
  }
}
