import { Component, OnInit, OnChanges } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { CommonService } from "../../../common-services/common.service";
import { CookieService } from "ngx-cookie-service";

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
  sortOrder: string = "teamName";
  reverse: boolean = false;
  parseFloat = parseFloat;
  limitTo: number = 10;
  searchBox: boolean = false;

  showDetails: string = "teams";
  compareUsers = [];

  //componentName: string;

  constructor(
    private dashboardService: LdDashboardService,
    private filterData: CommonService,
    private cookieService: CookieService
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
    console.log(this.cookieService.get('org-perform-details'));

    if (this.filterData.learnerFilterBodyDetails["currentModule"] == "teams") {
      this.showDetails = this.filterData.learnerFilterBodyDetails["currentModule"];
      this.dashboardService
        .getTeamData(this.limitTo)
        .subscribe((response: any) => {
          this.responseTeamsDetails = response.data;
        });
    } else if (this.filterData.learnerFilterBodyDetails["currentModule"] == "trainers") {
      this.showDetails = this.filterData.learnerFilterBodyDetails["currentModule"];
      this.dashboardService
        .getTrainersData(this.limitTo)
        .subscribe((response: any) => {
          this.responseTrainersDetails = response.data;
        });
    } else if (this.filterData.learnerFilterBodyDetails["currentModule"] == "learner") {
      this.showDetails = this.filterData.learnerFilterBodyDetails["currentModule"];
      this.dashboardService
        .getLearnerData(this.limitTo)
        .subscribe((response: any) => {
          this.responseLeanersDetails = response.data;
        });
    }
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

  ngOnChanges(changes: any) {
    if (changes.showDetails.currentValue) {
      this.getDataFromService();
    }
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
