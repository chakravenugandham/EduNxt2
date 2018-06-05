import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-org-performance-widget",
  templateUrl: "./org-performance-widget.component.html",
  styleUrls: ["./org-performance-widget.component.scss"]
})
export class OrgPerformanceWidgetComponent implements OnInit {
  routePath: string = "orgPerformanceFullView";
  getTab: string = 'teams';

  filtersData: {
    routeTo: "orgPerformanceFullView",
    filters: true,
    search: false,
    filterList: ["zone"]
  };
  teamsFn() {
    this.getTab = 'teams';
  }
  trainersFn() {
    this.getTab = 'trainers';
  }
  learnersFn() {
    this.getTab = 'learner';
  }
  constructor() { }

  ngOnInit() { }
}
