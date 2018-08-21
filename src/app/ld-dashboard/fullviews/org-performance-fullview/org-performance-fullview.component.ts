import { Component, OnInit, OnChanges } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { CommonService } from "../../../common-services/common.service";

@Component({
  selector: "app-org-performance-fullview",
  templateUrl: "./org-performance-fullview.component.html",
  styleUrls: ["./org-performance-fullview.component.scss"]
})
export class OrgPerformanceFullviewComponent implements OnInit, OnChanges {
  responseTeamsDetails: any;
  responseTrainersDetails: any;
  responseLeanersDetails: any;

  checkBoxValue: boolean = false;
  sortOrder: string = "learner";
  reverse: boolean = false;
  parseFloat = parseFloat;
  // limitTo: number = 10;
  searchBox: boolean = false;

  showDetails: string = "learner";
  componentName: string;
  compareUsers = [];

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0
  };

  //componentName: string;

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

  getFilterData() {
    this.componentName = this.filterData.learnerFilterBodyDetails["currentModule"];
  }

  //api calls for trainers ,teams and learner
  getDataFromService() {
    console.log(this.filterData.learnerFilterBodyDetails["currentModule"]);

    if (this.filterData.learnerFilterBodyDetails["currentModule"] == "teams") {
      this.showDetails = this.filterData.learnerFilterBodyDetails["currentModule"];
      this.dashboardService
        .getTeamData(this.pagination)
        .subscribe((response: any) => {
          this.responseTeamsDetails = response.data;
          this.pagination.total = response.pagination.total;
        });
    } else if (this.filterData.learnerFilterBodyDetails["currentModule"] == "trainers") {
      this.showDetails = this.filterData.learnerFilterBodyDetails["currentModule"];
      this.dashboardService
        .getTrainersData(this.pagination)
        .subscribe((response: any) => {
          this.responseTrainersDetails = response.data;
          this.pagination.total = response.pagination.total;
        });
    } else if (this.filterData.learnerFilterBodyDetails["currentModule"] == "learner" || this.filterData.learnerFilterBodyDetails["currentModule"] == undefined) {
      this.showDetails = this.filterData.learnerFilterBodyDetails["currentModule"] == undefined ? "learner" : this.filterData.learnerFilterBodyDetails["currentModule"];
      this.dashboardService
        .getLearnerData(this.pagination)
        .subscribe((response: any) => {
          this.responseLeanersDetails = response.data;
          this.pagination.total = response.pagination.total;
        });
    }

  }

  gotoPage($event) {
    this.pagination.page = $event;
    this.getDataFromService();
  }

  comapreUsers(teamData) {
    this.compareUsers.push(teamData.teamId);
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
  changeData(name) {
    this.filterData.learnerFilterBodyDetails["currentModule"] = name;
    this.pagination.page = 1;
    this.getDataFromService();
  }
  ngOnChanges(changes: any) {
    if (changes.showDetails.currentValue) {
      this.getDataFromService();
    }
  }

  ngOnInit() {
    this.filterData.learnerFilterBodyDetails["currentModule"] == "learner";
    this.getDataFromService();
    // this.getFilterData();
  }
}
