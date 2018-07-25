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
    console.log(this.paceData);
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
