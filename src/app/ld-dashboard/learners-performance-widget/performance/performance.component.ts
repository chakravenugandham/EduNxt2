import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
// import * as d3 from "d3";
declare let d3: any;

@Component({
  selector: "app-performance",
  templateUrl: "./performance.component.html",
  styleUrls: ["./performance.component.scss"]
})
export class PerformanceComponent implements OnInit, OnChanges {
  @Input() performanceData;
  barChartData;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.performanceData) {
      this.barChartData = this.performanceData;
    }
  }
}
