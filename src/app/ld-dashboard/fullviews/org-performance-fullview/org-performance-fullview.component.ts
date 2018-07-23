import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

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

  parseFloat = parseFloat;

  showDetails: string = "teams";
  compareUsers = [];

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
  }

  //api calls for trainers ,teams and learner
  getDataFromService() {
    this.dashboardService.getTrainersData().subscribe((response: any) => {
      this.responseTrainersDetails = response.data;
    });
    this.dashboardService.getTeamData().subscribe((response: any) => {
      this.responseTeamsDetails = response.data;
    });
    this.dashboardService.getLearnerData().subscribe((response: any) => {
      this.responseLeanersDetails = response.data;
    });
  }

  comapreUsers(teamData) {
    this.compareUsers.push(teamData.teamId);
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
