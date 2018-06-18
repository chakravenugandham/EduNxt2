import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as d3 from "d3";

@Component({
  selector: 'app-timespent',
  templateUrl: './timespent.component.html',
  styleUrls: ['./timespent.component.scss']
})
export class TimespentComponent implements OnInit {

  @Input() timeData;

  constructor() { }

  ngOnInit() { }
}
