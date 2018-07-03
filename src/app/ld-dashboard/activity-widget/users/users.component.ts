import { Component, OnInit, Input } from "@angular/core";
import { Config } from "../../../ld-dashboard/common/users-data/users-data.component";
import { LdDashboardService } from "../../services/ld-dashboard.service";

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

  responseData = {};

  userImages: string[] = [
    "/assets/images/user.png",
    "/assets/images/user.png",
    "/assets/images/user.png",
    "/assets/images/user.png"
  ];

  constructor(private getData: LdDashboardService) { }

  getAPIData() {
    this.getData.getActiveUsersWidgetData().subscribe((response: any) => {
      console.log(this.responseData);
      this.responseData = response.data;
    });
  }

  ngOnChanges(changes: any) {
    if (changes.userElement) {
      this.activeConfig = {
        peopleCurrentlyEnrolled: this.imageElement.activeUsers,
        usersSinceLastMonth: this.userElement.activeUsersSinceLastMonth,
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People are currently active"
      };
      this.enrolledConfig = {
        peopleCurrentlyEnrolled: this.userElement.enrolledUsers,
        usersSinceLastMonth: this.userElement.enrolledUsersSinceLastMonth,
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People are currently enrolled"
      };
    }
    this.numberFontColor = true;
  }

  ngOnInit() {
    //this.getAPIData();
  }
}
