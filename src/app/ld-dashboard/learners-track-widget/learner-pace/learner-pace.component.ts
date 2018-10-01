import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { _ } from "underscore";

@Component({
  selector: "app-learner-pace",
  templateUrl: "./learner-pace.component.html",
  styleUrls: ["./learner-pace.component.scss"]
})
export class LearnerPaceComponent implements OnInit, OnChanges {
  @Input() paceData: any;

  chartValues = [];
  nodataFlag = false;

  constructor() { }

  ngOnChanges(changes: any) {
    this.nodataFlag = _.isEmpty(this.paceData) ? true : false;

    if (changes.paceData.currentValue) {
      this.chartValues = [
        {
          color: "#23b14d",
          type: "classA",
          number: this.paceData.aheadSchedule
        },
        {
          color: "#ffd630",
          type: "classB",
          number: this.paceData.behindSchedule
        },
        {
          color: "#f77f6c",
          type: "classC",
          number: this.paceData.haveNotStarted
        },
        {
          color: "#5584ff",
          type: "classD",
          number: this.paceData.onTrack
        }
      ];
    }
  }

  ngOnInit() { }
}
