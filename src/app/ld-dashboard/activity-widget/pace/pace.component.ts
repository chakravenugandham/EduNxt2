import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as d3 from "d3v4";

@Component({
  selector: "app-pace",
  templateUrl: "./pace.component.html",
  styleUrls: ["./pace.component.scss"]
})
export class PaceComponent implements OnInit, OnChanges {
  @Input() paceDataElement;
  paceTrackValues = [];
  componentName = "active-learner-pace";

  constructor() {}

  ngOnChanges(changes: any) {
    if (changes.paceDataElement.currentValue) {
      this.paceTrackValues = [
        {
          color: "#F77F6C",
          type: "classA",
          number: this.paceDataElement["aheadOfSchedule"]
        },
        {
          color: "#5584FF",
          type: "classB",
          number: this.paceDataElement["behindSchedule"]
        },
        {
          color: "#23B14D",
          type: "classC",
          number: this.paceDataElement["haveNotStarted"]
        },
        {
          color: "#FFD630",
          type: "classE",
          number: this.paceDataElement["onTrack"]
        }
      ];
    }
  }

  ngOnInit() {}
}
