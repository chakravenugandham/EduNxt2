import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
declare let d3: any;

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.scss"]
})
export class ProgressComponent implements OnInit, OnChanges {
  @Input() progressData;
  @Input() batches:string[];
  barChartData;
  batchNames = [];
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.progressData) {
      this.barChartData = this.progressData;
      this.batchNames = this.batches;
    }
  }
}
