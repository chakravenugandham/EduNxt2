import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-learner-performance",
  templateUrl: "./learner-performance.component.html",
  styleUrls: ["./learner-performance.component.scss"]
})
export class LearnerPerformanceComponent implements OnInit {
  @Input() performanceData: any;
  chartValues = [];

  constructor() {}

  ngOnChanges(changes: any) {
    if (changes.performanceData.currentValue) {
      this.chartValues = [
        {
          color: "#23b14d",
          type: "classA",
          number: this.performanceData.excelling
        },
        {
          color: "#5584ff",
          type: "classB",
          number: this.performanceData.passing
        },
        {
          color: "#ffd630",
          type: "classD",
          number: this.performanceData.struggling
        },
        {
          color: "#f77f6c",
          type: "classC",
          number: this.performanceData.haveNotStarted
        }
      ];
    }
  }

  ngOnInit() {}
}
