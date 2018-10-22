import { Component, OnInit } from "@angular/core";
import { Config } from "../../../common/users-data/users-data.component";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {

  //custom component declaration
  activeUserCount: Config;
  enrolledConfig: Config;

  //variable declaration
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  responseData = {};

  userImages: string[] = [
    "/assets/images/user.png",
    "/assets/images/user.png",
    "/assets/images/user.png",
    "/assets/images/user.png",
    "/assets/images/user.png"
  ];

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getAPIData();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getAPIData();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getAPIData();
    });
    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getAPIData();
    });
  }

  //service call for api
  getAPIData() {
    this.spinner_loader = true;
    this.dashboardService
      .getActiveUsersWidgetData()
      .subscribe((response: any) => {
        this.responseData = response.data;
        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;

        this.activeUserCount = {
          peopleCurrentlyEnrolled: Number(this.responseData["activeUsers"]),

          numberChange: true,

          usersSinceLastMonth: Number(this.responseData["activeUsersSinceLastMonth"]),

          Users: "Users",
          sinceLastMonth: "",
          PeopleAreCurrentlyEnrolled: "People are currently active"
        };

        this.enrolledConfig = {
          peopleCurrentlyEnrolled: Number(this.responseData["enrolledUsers"]),

          numberChange: true,

          usersSinceLastMonth: Number(this.responseData["enrolledUsersSinceLastMonth"]),

          Users: "Users",
          sinceLastMonth: "",
          PeopleAreCurrentlyEnrolled: "People are currently enrolled"
        };
      });
  }

  ngOnInit() {
    //service call initiated
    this.getAPIData();
  }
}
