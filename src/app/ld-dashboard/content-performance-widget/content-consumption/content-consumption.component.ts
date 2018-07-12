import { Component, OnInit, Input, OnChanges } from "@angular/core";

import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-content-consumption",
  templateUrl: "./content-consumption.component.html",
  styleUrls: ["./content-consumption.component.scss"]
})
export class ContentConsumptionComponent implements OnInit, OnChanges {
  @Input() contentData;
  sortOrder: string = "contentName";
  sortByFn(sortByName) {
    this.sortOrder = sortByName;
  }
  constructor() {}

  ngOnChanges(changes: any) {
    if (changes.contentData.currentValue) {
    }
  }

  ngOnInit() {}
}
