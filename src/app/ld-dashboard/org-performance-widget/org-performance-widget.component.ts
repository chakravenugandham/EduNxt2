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
    appliedFilters: [],
    currentModule: ""
  };

  searchFilterData = {
    searchComponent: "learner-leaderboard",
    searchBy: "learnerName",
    searchCount: "5",
    searchedUsers: []
  };
  searchString: string = "";

  responseData = [];

  displayData = [];

  actualResponseData = [];

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
    this.filtersData.appliedFilters = this.teamsSearchItems;
    // this.filtersData.appliedFilters = []
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.getDataFromService();
  }
  trainersFn() {
    this.tooltipText = 'Trainers';
    this.filtersData.currentModule = "trainers";
    this.searchFilterData.searchComponent = "trainer-leaderboard";
    this.searchFilterData.searchBy = "trainerName";
    this.filtersData.appliedFilters = this.trainersSearchItems;
    // this.filtersData.appliedFilters = [];
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.getDataFromService();
  }
  learnersFn() {
    this.tooltipText = 'Learners';
    this.filtersData.currentModule = "learners";
    this.searchFilterData.searchComponent = "learner-leaderboard";
    this.searchFilterData.searchBy = "learnerName";
    this.filtersData.appliedFilters = this.learnersSearchItems;
    // this.filtersData.appliedFilters = [];
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.getDataFromService();
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.responseData = [];

    this.dashboardService
      .getPerformanceDetails(this.searchFilterData, this.searchString, this.pagination)
      .subscribe((response: any) => {
        this.responseData = this.displayData = this.actualResponseData = response.data;

        this.constructNewArray();
        this.spinner_loader = false;
        this.noDataFlag = this.responseData.length == 0 ? true : false;
      });
  }

  constructNewArray() {

    for (let i in this.filtersData.appliedFilters) {
      this.filtersData.appliedFilters[i]["new"] = true;
    }

    this.displayData = [];
    let tempArray = [];

    for (let i = 0; i < (this.responseData.length - this.filtersData.appliedFilters.length); i++) {
      tempArray.push(this.responseData[i]);
    }
    this.displayData = tempArray.concat(this.filtersData.appliedFilters);

  }

  getSearchItem($event) {
    this.filtersData.appliedFilters = $event;

    this.constructNewArray();

    // for (let i in this.filtersData.appliedFilters) {
    //   this.filtersData.appliedFilters[i]["new"] = true;
    // }

    // this.responseData = JSON.parse(JSON.stringify(this.actualResponseData));

    // if (this.filtersData.appliedFilters.length > 0)
    //   this.responseData.splice(-this.filtersData.appliedFilters.length);

    // this.displayData = [];
    // let tempArray = [];

    // for (let i = 0; i < (this.responseData.length - this.filtersData.appliedFilters.length); i++) {
    //   tempArray.push(this.responseData[i]);
    // }
    // this.displayData = tempArray.concat(this.filtersData.appliedFilters);


    // this.responseData = this.responseData.concat(this.filtersData.appliedFilters);
  }

  ngOnInit() {
    this.learnersFn();
  }
}
