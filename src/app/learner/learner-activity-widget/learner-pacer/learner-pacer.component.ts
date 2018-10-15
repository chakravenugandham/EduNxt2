import { Component, OnInit } from "@angular/core";
import { Config } from "../../../common/users-data/users-data.component";

@Component({
  selector: "app-learner-pacer",
  templateUrl: "./learner-pacer.component.html",
  styleUrls: ["./learner-pacer.component.scss"]
})
export class LearnerPacerComponent implements OnInit {
  config: Config;
  percentageChange: number;
  expectedChange: boolean;
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;
  engageUserChange: boolean = false;

  constructor() { }

  getLeanerPacerData() {
    this.percentageChange = 56;
    this.config = {
      peopleCurrentlyEnrolled: 46,
      numberChange: true,
      // numberChange: this.percentageChange < 50 ? false : true,
      usersSinceLastMonth: 4,
      Users: "Days",
      sinceLastMonth: "",
      PeopleAreCurrentlyEnrolled: "Of the pace that was set up"
    };
  }

  ngOnInit() {
    this.getLeanerPacerData();
  }
}
