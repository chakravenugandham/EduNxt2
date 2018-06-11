import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import * as d3 from "d3";
import { Config } from '../../../common/users-data/users-data.component';

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
    //   if (changes.engageData && this.engageData.peopleCompletedTraining) {

    //     this.chartRenderFn([this.engageData.peopleCompletedTraining]);
    //   }
  }

  ngOnInit() {
    this.config = {
      peopleCurrentlyEnrolled: 23,
      usersSinceLastMonth: 30,
      Users: "string",
      sinceLastMonth: "string",
      PeopleAreCurrentlyEnrolled: "string"
    }
  }
}
