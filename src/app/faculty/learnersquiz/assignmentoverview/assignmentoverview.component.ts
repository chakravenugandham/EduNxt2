import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignmentoverview',
  templateUrl: './assignmentoverview.component.html',
  styleUrls: ['./assignmentoverview.component.scss']
})
export class AssignmentoverviewComponent implements OnInit {

  teamsData: any[];
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
