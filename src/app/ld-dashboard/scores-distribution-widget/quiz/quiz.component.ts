import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() testData: any;

  dataSet = [[0, 0], [20, 100], [40, 600], [60, 1000], [80, 600], [100, 100], [110, 0]];

  constructor() { }

  ngOnInit() {
  }

}
