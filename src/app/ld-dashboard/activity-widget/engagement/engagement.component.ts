import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Config } from "../../../ld-dashboard/common/users-data/users-data.component";

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
  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: any) {
    if (changes.engageData.currentValue) {
      this.config = {
        peopleCurrentlyEnrolled: this.engageData.usersCompletedPrograms,
        usersSinceLastMonth: this.engageData.completedProgramsSinceLastMonth,
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People completed training programs"
      };

      this.percentageChange = Math.round(
        (this.config.peopleCurrentlyEnrolled * 100) /
        this.totalUsers.peopleCurrentlyEnrolled
      );

      this.expectedChange = this.percentageChange < 50 ? false : true;
    }
  }
}
