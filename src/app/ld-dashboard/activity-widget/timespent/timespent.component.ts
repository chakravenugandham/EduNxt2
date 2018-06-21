import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-timespent",
  templateUrl: "./timespent.component.html",
  styleUrls: ["./timespent.component.scss"]
})
export class TimespentComponent implements OnInit, OnChanges {
  @Input() timeData;
  percentageChange: number;
  expectedChange: boolean;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.timeData.currentValue) {
      this.percentageChange = Math.ceil(
        (this.timeData.totalTime * 100) / this.timeData.timeSpent
      );

      this.expectedChange =
        this.percentageChange < this.timeData.expectedTimeSpentPercentage
          ? false
          : true;
    }
  }
}
