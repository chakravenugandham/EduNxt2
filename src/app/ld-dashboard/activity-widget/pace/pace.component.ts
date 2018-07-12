import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as d3 from "d3v4";
import { LdDashboardService } from "../../services/ld-dashboard.service";

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

  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.getData.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.getData.getPaceWidgetData().subscribe((response: any) => {
      this.responseData = response.data;
      this.spinner_loader = false;
      this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
      this.paceTrackValues = [
        {
          color: "#23b14d",
          type: "classA",
          number: this.responseData["aheadSchedule"]
        },
        {
          color: "#ffd630",
          type: "classB",
          number: this.responseData["behindSchedule"]
        },
        {
          color: "#f77f6c",
          type: "classC",
          number: this.responseData["haveNotStarted"]
        },
        {
          color: "#5584ff",
          type: "classE",
          number: this.responseData["onTrack"]
        }
      ];
    });
  }

  ngOnChanges(changes: any) { }

  ngOnInit() {
    this.getDataFromService();
  }
}
