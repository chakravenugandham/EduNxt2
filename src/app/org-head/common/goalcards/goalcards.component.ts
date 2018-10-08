import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-goalcards',
  templateUrl: './goalcards.component.html',
  styleUrls: ['./goalcards.component.scss']
})
export class GoalcardsComponent implements OnInit {
  @Input() config: Config;

  constructor() { }

  ngOnInit() {
  }

}

export class Config {
  businessGoal: string;
  objectiveNumber: number;
  peopleTrained: number;
  timeRemaining: number;
  status: string;
}
