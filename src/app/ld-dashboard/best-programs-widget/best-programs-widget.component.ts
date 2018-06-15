import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-best-programs-widget",
  templateUrl: "./best-programs-widget.component.html",
  styleUrls: ["./best-programs-widget.component.scss"]
})
export class BestProgramsWidgetComponent implements OnInit {
  filtersData = {
    routeTo: "bestProgramsFullView",
    filters: true,
    search: false,
    filterList: ["program"]
  };
  constructor() {}

  ngOnInit() {}
}
