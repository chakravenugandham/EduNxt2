import { Component, OnInit, Input } from "@angular/core";
import { Config } from "../../../ld-dashboard/common/users-data/users-data.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  @Input() userElement;
  @Input() imageElement;

  activeConfig: Config;
  enrolledConfig: Config;
  numberFontColor: boolean;

  userImages: string[] = [
    "/assets/images/user.png",
    "/assets/images/user.png",
    "/assets/images/user.png",
    "/assets/images/user.png"
  ];

  constructor() {}

  ngOnChanges(changes: any) {
    if (changes.userElement) {
      this.activeConfig = {
        peopleCurrentlyEnrolled: this.imageElement.activeUsers,
        usersSinceLastMonth: this.userElement.changeInUsers,
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People are currently active"
      };
      this.enrolledConfig = {
        peopleCurrentlyEnrolled: this.userElement.peopleCurrentlyEnrolled,
        usersSinceLastMonth: this.userElement.usersSinceLastMonth,
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People are currently enrolled"
      };
    }
    this.numberFontColor = true;
  }

  ngOnInit() {}
}
