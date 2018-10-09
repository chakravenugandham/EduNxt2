import { Component, OnInit } from "@angular/core";
import * as d3 from "d3v4";
import { GoalcardsComponent, Config } from "../../common/goalcards/goalcards.component";

@Component({
  selector: "app-goals",
  templateUrl: "./goals.component.html",
  styleUrls: ["./goals.component.scss"]
})
export class GoalsComponent implements OnInit {
  firstCard: Config;
  secondCard: Config;
  graphSize = "smallGraph";
  goalSize: number;

  onSchedule: any[];
  behindSchedule: any[];

  constructor() { }

  paceTrackValues = [];

  ngOnChanges(changes: any) {
    if (changes.firstCard.currentValue && changes.secondCard.currentValue) {

    }
  }
  ngOnInit() {
    this.goalSize = 56;
    this.firstCard = {
      businessGoal: "50% Increase",
      objectiveNumber: 2500,
      peopleTrained: 1900,
      timeRemaining: 45,
      status: "On Schedule"
    };

    this.secondCard = {
      businessGoal: "string",
      objectiveNumber: 2500,
      peopleTrained: 1900,
      timeRemaining: 45,
      status: "Behind Schedule"
    };
  }
}
