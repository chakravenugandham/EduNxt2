import { Component, OnInit } from "@angular/core";
import { Router, Route } from "@angular/router";

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
  constructor(private router: Router) {}

  ngOnInit() {}

  routetoFullview() {
    this.router.navigate(["learnerTrackFullView"]);
  }

  filterArray = [];
  i = 0;
  addFilter() {
    this.i += 1;
    this.filterArray.push("Batch"+this.i);
    
  }
  removeFilter(i){
    console.log("removable filter index",i);
  }
}
