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
  @Input() paceDataElement;
  paceTrackValues = [];
  componentName = "active-learner-pace";

  responseData = {};
  noDataFlag: boolean = false;

  constructor(private getData: LdDashboardService) {
    this.getData.dateChange.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.getData.getPaceWidgetData().subscribe((response: any) => {
      this.responseData = response.data;
      console.log(this.responseData);
      if (
        this.responseData["aheadOfSchedule"] == 0 &&
        this.responseData["behindSchedule"] == 0 &&
        this.responseData["haveNotStarted"] == 0 &&
        this.responseData["onTrack"]
      ) {
        this.noDataFlag = true;
      }
      this.paceTrackValues = [
        {
          color: "#F77F6C",
          type: "classA",
          number: this.responseData["aheadOfSchedule"]
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

  ngOnChanges(changes: any) {
    // if (changes.responseData) {
    // }
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
