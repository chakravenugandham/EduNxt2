import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-users-data",
  templateUrl: "./users-data.component.html",
  styleUrls: ["./users-data.component.scss"]
})
export class UsersDataComponent implements OnInit {
  @Input() config: Config;

  constructor() { }
  monthFullName: string;
  constructPreviousMonth() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.monthFullName =
      monthNames[new Date().getMonth() - 1] + " " + new Date().getFullYear();
  }

  ngOnChanges(changes: any) {
    if (changes.config && changes.config.currentValue) {
      this.config = changes.config.currentValue;
    }
  }

  ngOnInit() {
    this.constructPreviousMonth();
  }
}

export class Config {
  peopleCurrentlyEnrolled: number;
  numberChange: boolean;
  usersSinceLastMonth: number;
  Users: string;
  sinceLastMonth: string;
  PeopleAreCurrentlyEnrolled: string;
}
