import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import * as d3 from "d3";
import { data } from '../../../common/half-donut-chart/half-donut-chart.component';

@Component({
  selector: 'app-userstrained',
  templateUrl: './userstrained.component.html',
  styleUrls: ['./userstrained.component.scss']
})
export class UserstrainedComponent implements OnInit, OnChanges {
  @Input() usersData;

  data: data;
  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.usersData.currentValue) {
      this.data = {
        chartData: this.usersData.usersCompletedTraining
      };
    }
  }

  ngOnInit() {
  }

}
