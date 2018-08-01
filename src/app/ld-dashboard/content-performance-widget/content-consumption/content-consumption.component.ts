import { Component, OnInit, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-content-consumption",
  templateUrl: "./content-consumption.component.html",
  styleUrls: ["./content-consumption.component.scss"]
})
export class ContentConsumptionComponent implements OnInit {
  @Input() contentData;
  sortOrder: string = "contentName";
  reverse: boolean = false;
  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    this.reverse = !this.reverse;
  }
  constructor() { }

  ngOnInit() { }
}
