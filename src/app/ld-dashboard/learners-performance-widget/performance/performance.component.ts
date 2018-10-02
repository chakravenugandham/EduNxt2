import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-performance",
  templateUrl: "./performance.component.html",
  styleUrls: ["./performance.component.scss"]
})
export class PerformanceComponent implements OnInit, OnChanges {
  @Input() performanceData: [];
  @Input() batches: string[];
  barChartData;
  batchNames = [];
  getTab = '';

  getTabData = "performance";
  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.performanceData) {
      this.barChartData = this.performanceData;
      this.batchNames = this.batches;
      this.getTab = this.getTabData;
    }
  }
}
