import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

@Component({
  selector: "app-org-performance-widget",
  templateUrl: "./org-performance-widget.component.html",
  styleUrls: ["./org-performance-widget.component.scss"]
})
export class OrgPerformanceWidgetComponent implements OnInit {

  tooltipText: string;

  //filters data
  filtersData = {
    routeTo: "orgPerformanceFullView",
    filters: false,
    search: true,
    viewDetails: true,
    filterList: [],
    currentModule: ""
  };

  searchFilterData = {
    searchComponent: "learner-leaderboard",
    searchBy: "learnerName"
  };
  searchString: string = "";

  responseData = [];

  actualResponseData = [];

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
  }

  teamsFn() {
    this.tooltipText = 'Teams';
    this.filtersData.currentModule = "teams";
    this.searchFilterData.searchComponent = "team-leaderboard";
    this.searchFilterData.searchBy = "teamName";
    this.searchFilterItem = this.teamsSearchItems;
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.getDataFromService();
  }
  trainersFn() {
    this.tooltipText = 'Trainers';
    this.filtersData.currentModule = "trainers";
    this.searchFilterData.searchComponent = "trainer-leaderboard";
    this.searchFilterData.searchBy = "trainerName";
    this.searchFilterItem = this.trainersSearchItems;
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.getDataFromService();
  }
  learnersFn() {
    this.tooltipText = 'Learners';
    this.filtersData.currentModule = "learners";
    this.searchFilterData.searchComponent = "learner-leaderboard";
    this.searchFilterData.searchBy = "learnerName";
    this.searchFilterItem = this.learnersSearchItems;
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.getDataFromService();
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.responseData = [];

    this.dashboardService
      .getPerformanceDetails(this.searchFilterData, this.searchString, this.pagination)
      .subscribe((response: any) => {
        this.responseData = this.actualResponseData = response.data;
        this.spinner_loader = false;
        this.noDataFlag = this.responseData.length == 0 ? true : false;
      });


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
    this.learnersFn();
  }
}
