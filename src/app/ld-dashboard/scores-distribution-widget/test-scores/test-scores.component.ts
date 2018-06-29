import { Component, OnInit, Input, OnChanges } from "@angular/core";
import * as d3 from "d3v4";

@Component({
  selector: "app-test-scores",
  templateUrl: "./test-scores.component.html",
  styleUrls: ["./test-scores.component.scss"]
})
export class TestScoresComponent implements OnInit, OnChanges {
  @Input() testData: any;
  dataSet: any;
  // dataSet = [[0, 0], [20, 100], [40, 600], [60, 1000], [80, 600], [100, 100], [110, 0]];

  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.testData.currentValue) {
      this.dataSet = this.testData;
    }
  }

  ngOnInit() { }
}
