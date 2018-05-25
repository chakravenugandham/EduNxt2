import { Component, OnInit } from "@angular/core";
import { Router, Route } from "@angular/router";

@Component({
  selector: "app-filter-widget",
  templateUrl: "./filter-widget.component.html",
  styleUrls: ["./filter-widget.component.scss"]
})
export class FilterWidgetComponent implements OnInit {
  filterArray = [];
  constructor(private router: Router) {}
  ngOnInit() {}

  addFilter() {
    this.filterArray.push("Batch");
    console.log("filterArray", this.filterArray);
  }
  removeFilter(i) {
    console.log("removable filter index", i);
    this.filterArray.splice(i,1);
    console.log("filterArray", this.filterArray);
  }
  routetoFullview() {
    this.router.navigate(["learnerTrackFullView"]);
  }
}
