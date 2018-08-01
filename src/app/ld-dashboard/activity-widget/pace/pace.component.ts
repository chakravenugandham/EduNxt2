import { Component, OnInit, Input, OnChanges } from "@angular/core";
import * as d3 from "d3v4";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-pace",
  templateUrl: "./pace.component.html",
  styleUrls: ["./pace.component.scss"]
})
export class PaceComponent implements OnInit {
  paceTrackValues = [];
  graphSize = "smallGraph";

  responseData = {};
  noDataFlag: boolean = false;
  spinner_loader: boolean = false;

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
    this.spinner_loader = true;
    this.dashboardService.getPaceWidgetData().subscribe((response: any) => {
      this.responseData = response.data;
      this.spinner_loader = false;
      this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
      this.paceTrackValues = [
        {
          color: "#FCA104",
          type: "classA",
          number: this.responseData["aheadSchedule"]
        },
        {
          color: "#5584FF",
          type: "classB",
          number: this.responseData["behindSchedule"]
        },
        {
          color: "#F77F6C",
          type: "classF",
          number: this.responseData["haveNotStarted"]
        },
        {
          color: "#23b14d",
          type: "classE",
          number: this.responseData["onTrack"]
        }
      ];
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
