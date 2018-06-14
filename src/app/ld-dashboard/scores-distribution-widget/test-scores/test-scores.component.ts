import { Component, OnInit, Input, OnChanges } from "@angular/core";
import * as d3 from "d3v4";

@Component({
  selector: "app-test-scores",
  templateUrl: "./test-scores.component.html",
  styleUrls: ["./test-scores.component.scss"]
})
export class TestScoresComponent implements OnInit, OnChanges {

  @Input() testData: any;

  dataSet = [[0, 0], [20, 100], [40, 600], [60, 1000], [80, 600], [100, 100], [110, 0]];

  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.testData.currentValue) {
      // for (let i = 0; i < this.testData.length; i++) {
      //   let z = this.testData[i].scoreRanges;
      //   console.log(z);
      //   let y = z.split("-");
      //   console.log(y);
      //   let x = parseInt(y[0]);
      //   console.log(x);
      //   this.dataSet = [[x, this.testData[i].numberOfUsers]];
      //   console.log(this.dataSet);
      // }
      //console.log(this.testData);
    }

  }

  ngOnInit() {
    //this.drawChart();
  }
}
