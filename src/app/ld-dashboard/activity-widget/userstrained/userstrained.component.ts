import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as d3 from "d3";

@Component({
  selector: 'app-userstrained',
  templateUrl: './userstrained.component.html',
  styleUrls: ['./userstrained.component.scss']
})
export class UserstrainedComponent implements OnInit, OnChanges {
  @Input() usersData;
  constructor() { }

  ngOnChanges(changes: any) {
    // if (changes.usersData && this.usersData.usersCompleatedTrainingPercentage) {
    //   this.chartRenderFn([this.usersData.usersCompleatedTrainingPercentage]);
    // }
  }

  ngOnInit() {
  }

}
