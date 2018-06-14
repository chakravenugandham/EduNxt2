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
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.scss"]
})
export class ProgressComponent implements OnInit, OnChanges {
  @Input() progressData;
  barChartData;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.progressData) {
      this.barChartData = this.progressData;
    }
  }
}
