import { Component, OnInit, Input } from "@angular/core";
import { dataClass } from "../../../common/donut-chart/donut-chart.component";

@Component({
  selector: "app-learner-pace",
  templateUrl: "./learner-pace.component.html",
  styleUrls: ["./learner-pace.component.scss"]
})
export class LearnerPaceComponent implements OnInit {
  @Input() paceData: any;

  data: dataClass;

  chartValues = [];

  constructor() { }

  ngOnChanges(changes: any) {
  }

  ngOnInit() {
    this.chartValues = [
      {
        color: "#F77F6C",
        type: "classA",
        number: this.paceData.aheadOfSchedule
      },
      {
        color: "#5584FF",
        type: "classB",
        number: this.paceData.behindSchedule
      },
      {
        color: "#23B14D",
        type: "classC",
        number: this.paceData.haveNotStarted
      },
      {
        color: "#FFD630",
        type: "classD",
        number: this.paceData.onTrack
      }
    ];
  }
}
