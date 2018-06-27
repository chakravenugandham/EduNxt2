import { Component, OnInit } from '@angular/core';
import * as d3 from "d3v4";
import { GoalcardsComponent, Config } from "../../common/goalcards/goalcards.component";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  firstCard: Config;
  secondCard: Config;
  componentName = "active-learner-pace";

  constructor() { }

  paceTrackValues = [];

  ngOnChanges(changes: any) {
    //if (changes.paceDataElement.currentValue) {
    //}
  }
  ngOnInit() {
    this.paceTrackValues = [
      {
        color: "#F77F6C",
        type: "classA",
        number: 80
      }
    ];

    this.firstCard = {
      businessGoal: 'string',
      objective: 'string',
      peopleTrained: 20,
      timeRemaining: 'string',
      status: 'string',
    };

    this.secondCard = {
      businessGoal: 'string',
      objective: 'string',
      peopleTrained: 20,
      timeRemaining: 'string',
      status: 'string',
    };
  }

}
