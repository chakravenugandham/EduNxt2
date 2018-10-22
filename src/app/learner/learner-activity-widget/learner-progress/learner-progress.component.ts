import { Component, OnInit } from "@angular/core";
import { Config } from "../../../common/users-data/users-data.component";

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

  constructor() { }

  getLeanerProgressData() {
    this.percentageChange = 42;
    this.config = {
      peopleCurrentlyEnrolled: 46,
      numberChange: true,
      // numberChange: this.percentageChange < 50 ? false : true,
      usersSinceLastMonth: 0,
      Users: "target was 50% with 10 days left",
      sinceLastMonth: "",
      PeopleAreCurrentlyEnrolled: "Of this course has been completed"
    };
  }

  ngOnInit() {
    this.getLeanerProgressData();
  }
}
