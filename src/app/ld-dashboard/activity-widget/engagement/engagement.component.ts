import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Config } from "../../../ld-dashboard/common/users-data/users-data.component";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-engagement",
  templateUrl: "./engagement.component.html",
  styleUrls: ["./engagement.component.scss"]
})
export class EngagementComponent implements OnInit, OnChanges {
  @Input() engageData;
  @Input() totalUsers;

  config: Config;
  totalUserCount: number;
  percentageChange: number;
  expectedChange: boolean;
  spinner_loader: boolean = false;

  responseData = {};
  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
    this.getData.dateChange.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.getData.getActiveUsersWidgetData().subscribe((response: any) => {
      this.totalUserCount = Number(response.data.enrolledUsers);
      this.spinner_loader = false;
      console.log(this.totalUserCount);
      this.getData.getEngagementWidgetData().subscribe((response: any) => {
        this.responseData = response.data;
        this.config = {
          peopleCurrentlyEnrolled: Math.round(
            this.responseData["usersCompletedPrograms"]
          ),
          usersSinceLastMonth: Math.round(
            this.responseData["completedProgramsSinceLastMonth"]
          ),
          Users: "Users",
          sinceLastMonth: "since last month",
          PeopleAreCurrentlyEnrolled: "People completed training programs"
        };

        this.percentageChange = Math.round(
          (this.config.peopleCurrentlyEnrolled * 100) / this.totalUserCount
        );
        console.log("this.percentageChange", this.percentageChange);

        this.expectedChange = this.percentageChange < 50 ? false : true;
      });
    });
  }

  ngOnChanges(changes: any) {}

  ngOnInit() {
    // this.getToalUsers();
    this.getDataFromService();
  }
}
