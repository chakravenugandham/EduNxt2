import { Component, OnInit } from "@angular/core";
import {
  UsersDataComponent,
  Config
} from "../../../ld-dashboard/common/users-data/users-data.component";

@Component({
  selector: "app-programstatus",
  templateUrl: "./programstatus.component.html",
  styleUrls: ["./programstatus.component.scss"]
})
export class ProgramstatusComponent implements OnInit {
  programStatusProgressConfig: Config;

  programStatusBehindConfig: Config;

  programStatusValues = [];
  graphSize = "smallGraph";

  constructor() {}

  ngOnInit() {
    this.programStatusProgressConfig = {
      peopleCurrentlyEnrolled: 45,
      numberChange: true,
      usersSinceLastMonth: 24,
      Users: "hours",
      sinceLastMonth: "since last month",
      PeopleAreCurrentlyEnrolled: "In progress"
    };

    this.programStatusBehindConfig = {
      peopleCurrentlyEnrolled: 45,
      numberChange: true,
      usersSinceLastMonth: 24,
      Users: "programs",
      sinceLastMonth: "since last month",
      PeopleAreCurrentlyEnrolled: "Behind Schedule"
    };

    this.programStatusValues = [
      {
        color: "#F77F6C",
        type: "classA",
        number: 24
      },
      {
        color: "#5584FF",
        type: "classB",
        number: 30
      }
    ];
  }
}
