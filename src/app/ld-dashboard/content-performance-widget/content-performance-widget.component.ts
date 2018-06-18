import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-content-performance-widget",
  templateUrl: "./content-performance-widget.component.html",
  styleUrls: ["./content-performance-widget.component.scss"]
})
export class ContentPerformanceWidgetComponent implements OnInit {
  routePath: string = "contentConsumptionFullView";
  filtersData = {
    routeTo: "contentConsumptionFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["contentType"]
  };
  constructor() {}

  ngOnInit() {}
}
