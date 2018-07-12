import { Component, OnInit } from '@angular/core';
import { Config } from "../../../../ld-dashboard/common/users-data/users-data.component";

@Component({
  selector: 'app-facultyperformance',
  templateUrl: './facultyperformance.component.html',
  styleUrls: ['./facultyperformance.component.scss']
})
export class FacultyperformanceComponent implements OnInit {
  config: Config;
  // spinner_loader: boolean = false;
  // noDataFlag: boolean = false;
  percentageChange: number;
  expectedChange: boolean;

  constructor() { }

  ngOnInit() {
    this.percentageChange = 75;
    this.expectedChange = true;
  }

}
