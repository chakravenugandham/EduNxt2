import { Component, OnInit } from "@angular/core";
import { Config } from "../../../ld-dashboard/common/users-data/users-data.component";

@Component({
  selector: "app-learner-progress",
  templateUrl: "./learner-progress.component.html",
  styleUrls: ["./learner-progress.component.scss"]
})
export class LearnerProgressComponent implements OnInit {
  config: Config;
  percentageChange: number;
  expectedChange: boolean;
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;
  engageUserChange: boolean = false;

  constructor() {}

  ngOnInit() {
    this.percentageChange = 60;
    this.config = {
      peopleCurrentlyEnrolled: 60,
      numberChange: true,
      // numberChange: this.percentageChange < 50 ? false : true,
      usersSinceLastMonth: 4,
      Users: "target was 50% with 10 days left",
      sinceLastMonth: "",
      PeopleAreCurrentlyEnrolled: "Of this course has been completed"
    };
  }
}
