import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";

declare let d3: any;

@Component({
  selector: "app-performance",
  templateUrl: "./performance.component.html",
  styleUrls: ["./performance.component.scss"]
})
export class PerformanceComponent implements OnInit, OnChanges {
  @Input() performanceData;
  @Input() batches:string[];
  barChartData;
  batchNames = [];
  constructor() {}

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.performanceData) {
      this.barChartData = this.performanceData;
      this.batchNames = this.batches;
    }
  }
}
