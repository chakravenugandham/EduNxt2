import { Component, OnInit } from "@angular/core";
import { UsersDataComponent, Config } from "../../../common/users-data/users-data.component";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

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

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  responseData = {};

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.dashboardService.getProgramStatus().subscribe((response: any) => {
      this.responseData = response.data;

      this.programStatusProgressConfig = {
        peopleCurrentlyEnrolled: this.responseData['inProgress'],
        numberChange: true,
        usersSinceLastMonth: this.responseData['inProgressSinceLastMonth'],
        Users: "hours",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "In progress"
      };

      this.programStatusBehindConfig = {
        peopleCurrentlyEnrolled: this.responseData['behindSchedule'],
        numberChange: true,
        usersSinceLastMonth: this.responseData['behindScheduleSinceLasthMonth'],
        Users: "programs",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "Behind Schedule"
      };
    });
  }

  ngOnInit() {
    //this.getDataFromService();
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
    this.programStatusProgressConfig = {
      peopleCurrentlyEnrolled: 67,
      numberChange: true,
      usersSinceLastMonth: 54,
      Users: "hours",
      sinceLastMonth: "since last month",
      PeopleAreCurrentlyEnrolled: "In progress"
    };

    this.programStatusBehindConfig = {
      peopleCurrentlyEnrolled: 25,
      numberChange: false,
      usersSinceLastMonth: 45,
      Users: "hours",
      sinceLastMonth: "since last month",
      PeopleAreCurrentlyEnrolled: "Behind Schedule"
    };

  }
}
