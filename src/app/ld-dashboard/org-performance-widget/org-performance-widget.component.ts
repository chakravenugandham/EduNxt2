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
      this.getServiceData();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getServiceData();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getServiceData();
    });
  }

  teamsFn() {
    this.getTab = "teams";
    this.filtersData.currentModule = "teams";
    this.searchFilterData.searchComponent = "team-leaderboard";
    this.searchFilterData.searchBy = "teamName";
    this.getServiceData();
  }
  trainersFn() {
    this.getTab = "trainers";
    this.filtersData.currentModule = "trainers";
    this.searchFilterData.searchComponent = "trainer-leaderboard";
    this.searchFilterData.searchBy = "trainerName";
    this.getServiceData();
  }
  learnersFn() {
    this.getTab = "learner";
    this.filtersData.currentModule = "learner";
    this.searchFilterData.searchComponent = "learner-leaderboard";
    this.searchFilterData.searchBy = "learnerName";
    this.getServiceData();
  }

  getServiceData() {
    this.spinner_loader = true;
    this.responseData = [];
    if (this.getTab == "teams") {
      this.dashboardService
        .getTeamData(this.limitTo)
        .subscribe((response: any) => {
          this.responseData = this.actualResponseData = response.data;
          // this.actualResponseData = response.data;
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
    console.log("filter item", $event);
    this.searchFilterItem = $event;
    for (let i in this.searchFilterItem) {
      this.searchFilterItem[i]["new"] = true;
    }
    // this.responseData = [];
    // this.responseData = this.actualResponseData;
    this.responseData = JSON.parse(JSON.stringify(this.actualResponseData));
    console.log("responseData before filter", this.responseData);

    if (this.searchFilterItem.length > 0)
      this.responseData.splice(-this.searchFilterItem.length);
    console.log("spliced last length", this.responseData);
    console.log("actualResponseData", this.actualResponseData);

    this.responseData = this.responseData.concat(this.searchFilterItem);
    console.log("concatinated with search item", this.responseData);

    // this.responseData = this.responseData.concat(this.searchFilterItem);
    // for (let i in this.searchFilterItem) {
    //   this.responseData.splice(this.responseData[this.responseData.length], 1);
    // }
    // this.responseData.concat(this.searchFilterItem);
    console.log("responseData after filter", this.responseData);
    // this.responseData.splice(this.searchFilterItem.length,)
    // this.searchFilterData.searchItem = $event;
  }

  ngOnInit() {
    this.getServiceData();
  }
}
