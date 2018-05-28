import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-learners-performance-widget",
  templateUrl: "./learners-performance-widget.component.html",
  styleUrls: ["./learners-performance-widget.component.scss"]
})
export class LearnersPerformanceWidgetComponent implements OnInit {
  routePath: string = "learnerPerformanceFullView";
  performance: boolean = true;
  constructor() {}

  ngOnInit() {}
}
