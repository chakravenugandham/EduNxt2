import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-learners-track-widget",
  templateUrl: "./learners-track-widget.component.html",
  styleUrls: ["./learners-track-widget.component.scss"]
})
export class LearnersTrackWidgetComponent implements OnInit {
  learnerPace: boolean = true;
  learnerPaceFn() {
    this.learnerPace = true;
  }
  learnerPerfFn() {
    this.learnerPace = false;
  }
  routePath:string = "learnerTrackFullView";
  constructor() {}

  ngOnInit() {}
}
