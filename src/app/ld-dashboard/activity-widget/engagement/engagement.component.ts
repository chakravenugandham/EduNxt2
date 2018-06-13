import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import * as d3 from "d3";
import { Config } from '../../../common/users-data/users-data.component';
import { HalfdonutchartDirective } from "../../../directives/halfdonutchart.directive";
@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.scss']
})
export class EngagementComponent implements OnInit, OnChanges {
  @Input() engageData;

  config: Config;

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
    }
  }

  ngOnInit() {
  }
}

