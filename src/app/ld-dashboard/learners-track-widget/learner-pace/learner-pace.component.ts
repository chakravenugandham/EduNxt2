import { Component, OnInit, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-learner-pace",
  templateUrl: "./learner-pace.component.html",
  styleUrls: ["./learner-pace.component.scss"]
})
export class LearnerPaceComponent implements OnInit, OnChanges {
  @Input() paceData: any;

  chartValues = [];

  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.paceData.currentValue) {
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

  ngOnInit() {

  }
}
