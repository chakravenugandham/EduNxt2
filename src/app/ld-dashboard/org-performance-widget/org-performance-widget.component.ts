import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-org-performance-widget",
  templateUrl: "./org-performance-widget.component.html",
  styleUrls: ["./org-performance-widget.component.scss"]
})
export class OrgPerformanceWidgetComponent implements OnInit {
  componentName: string = "learner";

  filtersData = {
    routeTo: "orgPerformanceFullView",
    filters: false,
    search: true,
    viewDetails: true,
    filterList: ["zone"],
    currentModule: this.componentName
  };

  searchFilterData = {
    searchComponent: "learner-leaderboard",
    searchBy: "learnerName"
  };

  responseData = [];

  actualResponseData = [];
  limitTo: number = 5;

  filterbody = {};

  searchFilterItem = [];

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(private dashboardService: LdDashboardService, private filterData: CommonService, private cookieService: CookieService) {
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
    this.componentName = this.filtersData.currentModule = "teams";
    this.filterData.learnerFilterBodyDetails = this.filtersData;
    this.searchFilterData.searchComponent = "team-leaderboard";
    this.searchFilterData.searchBy = "teamName";
    this.cookieService.set('org-perform-details', 'teams');
    console.log(document.cookie);

    this.getDataFromService();
  }
  trainersFn() {
    this.componentName = this.filtersData.currentModule = "trainers";
    this.filterData.learnerFilterBodyDetails = this.filtersData;
    this.searchFilterData.searchComponent = "trainer-leaderboard";
    this.searchFilterData.searchBy = "trainerName";
    this.cookieService.set('org-perform-details', 'trainers');
    console.log(document.cookie);

    this.getDataFromService();
  }
  learnersFn() {
    this.componentName = this.filtersData.currentModule = "learner";
    this.filterData.learnerFilterBodyDetails = this.filtersData;
    this.searchFilterData.searchComponent = "learner-leaderboard";
    this.searchFilterData.searchBy = "learnerName";
    this.cookieService.set('org-perform-details', 'learner');
    console.log(document.cookie);

    this.getDataFromService();
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.responseData = [];
    if (this.componentName == "teams") {
      this.dashboardService
        .getTeamData(this.limitTo)
        .subscribe((response: any) => {
          this.responseData = this.actualResponseData = response.data;
          this.spinner_loader = false;
          this.noDataFlag = this.responseData.length == 0 ? true : false;
        });
    } else if (this.componentName == "trainers") {
      this.dashboardService
        .getTrainersData(this.limitTo)
        .subscribe((response: any) => {
          this.responseData = this.actualResponseData = response.data;
          this.spinner_loader = false;
          this.noDataFlag = this.responseData.length == 0 ? true : false;
        });
    } else if ((this.componentName = "learner")) {
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
    this.cookieService.set('org-perform-details', 'learner');
    this.getDataFromService();
  }
}
