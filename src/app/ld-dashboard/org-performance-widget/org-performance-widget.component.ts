import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-org-performance-widget",
  templateUrl: "./org-performance-widget.component.html",
  styleUrls: ["./org-performance-widget.component.scss"]
})
export class OrgPerformanceWidgetComponent implements OnInit {
  routePath: string = "orgPerformanceFullView";
  filtersData: {
    routeTo: "orgPerformanceFullView",
    filters: true,
    search: false,
    filterList: ["zone"]
  };
  trainers: boolean = true;
  teams: boolean = false;
  teamsFn() {
    this.teams = true;
    this.trainers = false;
  }
  trainersFn(){
    this.trainers = true;
    this.teams = false;
  }
  learnersFn(){
    this.trainers = false;
    this.teams = false;
  }
  constructor() {}

  ngOnInit() {}
}
