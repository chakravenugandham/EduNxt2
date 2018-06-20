import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-userstrained',
  templateUrl: './userstrained.component.html',
  styleUrls: ['./userstrained.component.scss']
})
export class UserstrainedComponent implements OnInit, OnChanges {
  @Input() usersData;
  percentageChange:number;
  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.usersData.currentValue) {
      this.percentageChange = Math.floor((this.usersData.usersTrained*100)/this.usersData.usersCompletedTraining);
    }
  }

  ngOnInit() {
  }

}
