import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Config } from "../../../common/users-data/users-data.component";

@Component({
  selector: "app-engagement",
  templateUrl: "./engagement.component.html",
  styleUrls: ["./engagement.component.scss"]
})
export class EngagementComponent implements OnInit, OnChanges {
  @Input() engageData;
  config: Config;
  percentageChange: number;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: any) {
    if (changes.engageData.currentValue) {
      this.config = {
        peopleCurrentlyEnrolled: this.engageData.peopleCompletedTraining,
        usersSinceLastMonth: this.engageData.peopleChange,
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People are currently active"
      };
      this.percentageChange = Math.floor(
        (this.engageData.peopleCompletedTraining * 36) /
          this.engageData.peopleCompletedTraining
      );
    }
  }
}
