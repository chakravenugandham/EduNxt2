import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import * as d3 from "d3";
import { Config } from '../../../common/users-data/users-data.component';
import { data } from '../../../common/half-donut-chart/half-donut-chart.component';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.scss']
})
export class EngagementComponent implements OnInit, OnChanges {
  @Input() engageData;

  config: Config;

  data: data;

  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.engageData.currentValue) {
      this.config = {
        peopleCurrentlyEnrolled: this.engageData.peopleCompletedTraining,
        usersSinceLastMonth: this.engageData.peopleChange,
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People are currently active"
      }
      this.data = {
        chartData: this.engageData.peopleCompletedTraining
      };
    }
  }

  ngOnInit() {
  }
}
