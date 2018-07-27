import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-org-interest-widget",
  templateUrl: "./org-interest-widget.component.html",
  styleUrls: ["./org-interest-widget.component.scss"]
})
export class OrgInterestWidgetComponent implements OnInit, OnChanges {
  routePath: string = "orgInterestFullView";
  filtersData = {
    routeTo: "orgInterestFullView",
    filters: false,
    search: true,
    viewDetails: true,
    filterList: []
  };

  filterbody = {};

  constructor() { }

  getFilterObject($event) {
    this.filterbody = $event;
  }
  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterbody) {
    }
  }
}
