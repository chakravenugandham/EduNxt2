import { Component, OnInit, Input } from "@angular/core";
import * as d3 from "d3v4";
import { map } from "d3";

@Component({
  selector: "app-learner-performance",
  templateUrl: "./learner-performance.component.html",
  styleUrls: ["./learner-performance.component.scss"]
})
export class LearnerPerformanceComponent implements OnInit {
  @Input() performanceData: any;

  chartValues = [];

  constructor() { }

  ngOnChanges(changes: any) {

    if (changes.performanceData.currentValue) {
      this.chartValues = [
        {
          color: "#F77F6C",
          type: "classA",
          number: this.performanceData.excelling
        },
        {
          color: "#5584FF",
          type: "classB",
          number: this.performanceData.passing
        },
        {
          color: "#FFD630",
          type: "classD",
          number: this.performanceData.struggling
        }
      ];
    }
  }

  ngOnInit() { }
}
