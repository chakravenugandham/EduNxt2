import { Component, OnInit } from "@angular/core";
import { Config } from "../../../common/users-data/users-data.component";

@Component({
  selector: "app-facultyperformance",
  templateUrl: "./facultyperformance.component.html",
  styleUrls: ["./facultyperformance.component.scss"]
})
export class FacultyperformanceComponent implements OnInit {
  config: Config;
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;
  percentageChange: number;
  expectedChange: boolean;

  getTab: string = "facultyperformance";

  filtersData = {
    routeTo: "learnerQuizFullView",
    filters: false,
    search: true,
    viewDetails: true,
    filterList: ["zone"],
    currentModule: this.getTab
  };

  filterbody = {};

  constructor() { }

  getFilterObject($event) {
    this.filterbody = $event;
  }

  ngOnInit() {
    this.config = {
      peopleCurrentlyEnrolled: 20,
      numberChange: true,
      usersSinceLastMonth: 30,
      Users: "Users",
      sinceLastMonth: "",
      // sinceLastMonth: new Date(start_date).toLocaleDateString(),
      PeopleAreCurrentlyEnrolled: "People completed training programs"
    };

    if (this.config.peopleCurrentlyEnrolled > 0) {
      this.percentageChange = Math.round(
        (this.config.peopleCurrentlyEnrolled * 100) / 15
      );
    } else {
      this.percentageChange = 0;
    }
    this.expectedChange = this.percentageChange < 50 ? false : true;
  }
}
