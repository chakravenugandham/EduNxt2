import { Component, OnInit, Input } from "@angular/core";
import { Config } from "../../../ld-dashboard/common/users-data/users-data.component";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  // @Input() userElement;
  // @Input() imageElement;

  activeUserCount: Config;
  enrolledConfig: Config;
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  responseData = {};
  // activeUserChange: boolean = false;
  // enrolledUserChange: boolean = false;

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

  getAPIData() {
    this.spinner_loader = true;
    this.dashboardService
      .getActiveUsersWidgetData()
      .subscribe((response: any) => {
        this.responseData = response.data;
        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;

        // this.activeUserChange =
        //   this.responseData["activeUsers"] <
        //   this.responseData["activeUsersSinceLastMonth"]
        //     ? false
        //     : true;

        // this.enrolledUserChange =
        //   this.responseData["enrolledUsers"] <
        //   this.responseData["enrolledUsersSinceLastMonth"]
        //     ? false
        //     : true;

        this.activeUserCount = {
          peopleCurrentlyEnrolled: Number(this.responseData["activeUsers"]),

          numberChange: true,

          usersSinceLastMonth: Number(
            this.responseData["activeUsersSinceLastMonth"]
          ),

          Users: "Users",
          sinceLastMonth: "",
          PeopleAreCurrentlyEnrolled: "People are currently active"
        };

        this.enrolledConfig = {
          peopleCurrentlyEnrolled: Number(this.responseData["enrolledUsers"]),

          numberChange: true,

          usersSinceLastMonth: Number(
            this.responseData["enrolledUsersSinceLastMonth"]
          ),

          Users: "Users",
          sinceLastMonth: "",
          PeopleAreCurrentlyEnrolled: "People are currently enrolled"
        };
      });
  }

  ngOnChanges(changes: any) { }

  ngOnInit() {
    this.getAPIData();
  }
}
