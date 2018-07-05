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
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  responseData = {};

  userImages: string[] = [
    "/assets/images/user.png",
    "/assets/images/user.png",
    "/assets/images/user.png",
    "/assets/images/user.png"
  ];

  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getAPIData();
    });

    this.getData.dateChange.subscribe(result => {
      this.getAPIData();
    });
  }

  getAPIData() {
    this.spinner_loader = true;
    this.getData.getActiveUsersWidgetData().subscribe((response: any) => {
      this.responseData = response.data;
      this.spinner_loader = false;

      this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;

      this.activeConfig = {
        peopleCurrentlyEnrolled: Math.round(this.responseData["activeUsers"]),
        usersSinceLastMonth: Math.round(
          this.responseData["activeUsersSinceLastMonth"]
        ),
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People are currently active"
      };
      this.enrolledConfig = {
        peopleCurrentlyEnrolled: Math.round(this.responseData["enrolledUsers"]),
        usersSinceLastMonth: Math.round(
          this.responseData["enrolledUsersSinceLastMonth"]
        ),
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People are currently enrolled"
      };
      this.numberFontColor = true;
    });
  }

  ngOnChanges(changes: any) {
    if (changes.responseData) {
    }
  }

  ngOnInit() {
    this.getAPIData();
  }
}
