import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizoverview',
  templateUrl: './quizoverview.component.html',
  styleUrls: ['./quizoverview.component.scss']
})
export class QuizoverviewComponent implements OnInit {

  teamsData: any[];
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
