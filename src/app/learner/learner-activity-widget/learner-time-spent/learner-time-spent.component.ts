import { Component, OnInit } from "@angular/core";
import { Config } from "../../../common/users-data/users-data.component";

@Component({
  selector: "app-learner-time-spent",
  templateUrl: "./learner-time-spent.component.html",
  styleUrls: ["./learner-time-spent.component.scss"]
})
export class LearnerTimeSpentComponent implements OnInit {
  config: Config;
  percentageChange: number;
  expectedChange: boolean;
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;
  engageUserChange: boolean = false;

  constructor() { }

  getLeanerTimeData() {
    this.percentageChange = 82;
    this.config = {
      peopleCurrentlyEnrolled: 46,
      numberChange: true,
      // numberChange: this.percentageChange < 50 ? false : true,
      usersSinceLastMonth: 1,
      Users: "On par with recommended time of 12 hours",
      sinceLastMonth: "",
      PeopleAreCurrentlyEnrolled: "Hours spent on course content"
    };
  }

  ngOnInit() {
    this.getLeanerTimeData();
  }
}
