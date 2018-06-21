import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-users-data",
  templateUrl: "./users-data.component.html",
  styleUrls: ["./users-data.component.scss"]
})
export class UsersDataComponent implements OnInit {
  @Input() config: Config;
  @Input() numberFontColor:boolean;

  constructor() {}

  ngOnChanges(changes: any) {
    if (changes.config && changes.config.currentValue) {
      this.config = changes.config.currentValue;
    }
  }

  ngOnInit() {}
}

export class Config {
  peopleCurrentlyEnrolled: number;
  usersSinceLastMonth: number;
  Users: string;
  sinceLastMonth: string;
  PeopleAreCurrentlyEnrolled: string;
}
