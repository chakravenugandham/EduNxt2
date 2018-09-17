import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-learner-score-card",
  templateUrl: "./learner-score-card.component.html",
  styleUrls: ["./learner-score-card.component.scss"]
})
export class LearnerScoreCardComponent implements OnInit {

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor() { }

  ngOnInit() { }
}
