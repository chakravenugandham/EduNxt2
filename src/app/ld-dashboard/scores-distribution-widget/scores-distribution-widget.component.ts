import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-scores-distribution-widget",
  templateUrl: "./scores-distribution-widget.component.html",
  styleUrls: ["./scores-distribution-widget.component.scss"]
})
export class ScoresDistributionWidgetComponent implements OnInit {
  routePath: string = "scoreDistributionFullView";
  testScore: boolean = true;
  quizScore: boolean = false;
  testScoreFn() {
    this.testScore = true;
    this.quizScore = false;
  }
  quizScoreFn(){
    this.quizScore = true;
    this.testScore = false;
  }
  assignmentFn(){
    this.quizScore = false;
    this.testScore = false;
  }
  constructor() {}

  ngOnInit() {}
}
