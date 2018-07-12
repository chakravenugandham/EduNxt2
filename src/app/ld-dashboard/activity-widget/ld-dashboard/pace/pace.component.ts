import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as d3 from "d3v4";
import { LdDashboardService } from "../../../services/ld-dashboard.service";

@Component({
  selector: "app-pace",
  templateUrl: "./pace.component.html",
  styleUrls: ["./pace.component.scss"]
})
export class PaceComponent implements OnInit, OnChanges {
  // @Input() paceDataElement;
  paceTrackValues = [];
  componentName = "active-learner-pace";

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
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.dashboardService.getPaceWidgetData().subscribe((response: any) => {
      this.responseData = response.data;
      this.spinner_loader = false;
      this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
      this.paceTrackValues = [
        {
          color: "#F77F6C",
          type: "classA",
          number: this.responseData["aheadSchedule"]
        },
        {
          color: "#5584FF",
          type: "classB",
          number: this.responseData["behindSchedule"]
        },
        {
          color: "#23B14D",
          type: "classC",
          number: this.responseData["haveNotStarted"]
        },
        {
          color: "#FFD630",
          type: "classE",
          number: this.responseData["onTrack"]
        }
      ];
    });
  }

  ngOnChanges(changes: any) {}

  ngOnInit() {
    this.getDataFromService();
  }
}
