import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { CommonService } from "../../../common-services/common.service";

@Component({
  selector: "app-org-performance-fullview",
  templateUrl: "./org-performance-fullview.component.html",
  styleUrls: ["./org-performance-fullview.component.scss"]
})
export class OrgPerformanceFullviewComponent implements OnInit {
  responseTeamsDetails: any;
  responseTrainersDetails: any;
  responseLeanersDetails: any;

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
    total: 0
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
        this.responseTeamsDetails = response.data;
        this.pagination.total = response.pagination.total;

        this.spinner_loader = false;
        this.noDataFlag = response.data.length == 0 ? true : false;
      });
    }

    else if (this.componentName == "trainers") {
      this.dashboardService.getTrainersData(this.pagination).subscribe((response: any) => {
        this.responseTrainersDetails = response.data;
        this.pagination.total = response.pagination.total;

        this.spinner_loader = false;
        this.noDataFlag = response.data.length == 0 ? true : false;
      });
    }

    else if (this.componentName) {
      this.dashboardService.getLearnerData(this.pagination).subscribe((response: any) => {
        this.responseLeanersDetails = response.data;
        this.pagination.total = response.pagination.total;

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
    if (this.compareUsers.includes(user)) {
      this.compareUsers.splice(this.compareUsers.indexOf(user), 1)
    }
    else {
      this.compareUsers.push(user);
    }
  }

  compareSelected() {
    console.log("compareUsers", this.compareUsers.length);
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
    this.componentName = name;
    localStorage.setItem('orgPerformaModule', name);
    this.pagination.page = 1;
    this.compareUsers = [];
    this.getDataFromService();
  }


  ngOnInit() {
    this.componentName = this.showDetails = localStorage.getItem('orgPerformaModule');
    this.getDataFromService();
  }
}
