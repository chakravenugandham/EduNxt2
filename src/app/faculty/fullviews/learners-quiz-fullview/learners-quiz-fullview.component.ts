import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learners-quiz-fullview',
  templateUrl: './learners-quiz-fullview.component.html',
  styleUrls: ['./learners-quiz-fullview.component.scss']
})
export class LearnersQuizFullviewComponent implements OnInit {

  showDetails: string = "quiz";

  constructor() { }

  ngOnInit() {
  }

}
