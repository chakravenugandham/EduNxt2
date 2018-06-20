import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as d3 from "d3";

@Component({
  selector: "app-timespent",
  templateUrl: "./timespent.component.html",
  styleUrls: ["./timespent.component.scss"]
})
export class TimespentComponent implements OnInit, OnChanges {
  @Input() timeData;
  percentageChange: number;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: any) {
    if (changes.timeData.currentValue) {
      this.percentageChange = Math.ceil(
        (this.timeData.totalTime * 100) / this.timeData.timeSpent
      );
    }
  }
}
