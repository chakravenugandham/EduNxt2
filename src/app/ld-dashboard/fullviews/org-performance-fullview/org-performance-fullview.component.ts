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

  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  //api calls for trainers ,teams and learner
  getDataFromService() {
    this.getData.getTrainersData().subscribe((response: any) => {
      this.responseTrainersDetails = response.data;
    });
    this.getData.getTeamData().subscribe((response: any) => {
      this.responseTeamsDetails = response.data;
      console.log("responseTeamsDetails", this.responseTeamsDetails);
    });
    this.getData.getLearnerData().subscribe((response: any) => {
      this.responseLeanersDetails = response.data;
    });
  }

  comapreUsers(teamData) {
    this.compareUsers.push(teamData.teamId);
    console.log("this.compareUsers", this.compareUsers);
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
