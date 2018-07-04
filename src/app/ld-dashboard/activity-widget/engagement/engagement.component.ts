import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Config } from "../../../ld-dashboard/common/users-data/users-data.component";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-engagement",
  templateUrl: "./engagement.component.html",
  styleUrls: ["./engagement.component.scss"]
})
export class EngagementComponent implements OnInit, OnChanges {
  @Input() engageData;
  @Input() totalUsers;

  config: Config;
  totalUserCount: number;
  percentageChange: number;
  expectedChange: boolean;

  responseData = {};
  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe((result) => {
      this.getDataFromService();
    })
  }

  getDataFromService() {
    this.getData.getEngagementWidgetData().subscribe((response: any) => {
      this.responseData = response.data;
      //console.log(this.responseData);
      this.config = {
        peopleCurrentlyEnrolled: this.responseData['usersCompletedPrograms'],
        usersSinceLastMonth: this.responseData['completedProgramsSinceLastMonth'],
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People completed training programs"
      };

      this.percentageChange = Math.round(
        (this.config.peopleCurrentlyEnrolled * 100) /
        this.totalUsers.peopleCurrentlyEnrolled
      );

      this.expectedChange = this.percentageChange < 50 ? false : true;
      //console.log(this.responseData);
    })

  };

  ngOnChanges(changes: any) {
    //this.getDataFromService();
    //if (changes.responseData.currentValue) {
    //console.log(this.responseData, 'ngonchanges');
    // this.config = {
    //   peopleCurrentlyEnrolled: this.responseData['usersCompletedPrograms'],
    //   usersSinceLastMonth: this.responseData['completedProgramsSinceLastMonth'],
    //   Users: "Users",
    //   sinceLastMonth: "since last month",
    //   PeopleAreCurrentlyEnrolled: "People completed training programs"
    // };

    // this.percentageChange = Math.round(
    //   (this.config.peopleCurrentlyEnrolled * 100) /
    //   this.totalUsers.peopleCurrentlyEnrolled
    // );

    // this.expectedChange = this.percentageChange < 50 ? false : true;
    // }
  }

  ngOnInit() {
    this.getDataFromService();
  }

}
