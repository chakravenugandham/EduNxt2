import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as d3 from "d3";

@Component({
  selector: 'app-timespent',
  templateUrl: './timespent.component.html',
  styleUrls: ['./timespent.component.scss']
})
export class TimespentComponent implements OnInit, OnChanges {

  @Input() timeData;

  constructor() { }

  ngOnChanges(changes: any) {
    // if (changes.timeData && this.timeData.timeSpent) {
    //   this.chartRenderFn([this.timeData.timeSpent]);
    // }
  }

  ngOnInit() { }
}
