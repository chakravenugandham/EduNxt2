import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-content-consumption",
  templateUrl: "./content-consumption.component.html",
  styleUrls: ["./content-consumption.component.scss"]
})
export class ContentConsumptionComponent implements OnInit {
  @Input() contentData;
  @Output() sortBy = new EventEmitter<any>();
  sortOrder: string = 'contentName';
  sortFlag: boolean = false;
  order: string = 'desc';

  // sortOrder: string = "contentName";
  reverse: boolean = false;

  constructor() { }

  sortByFn(sortByName) {
    this.sortFlag = !this.sortFlag;
    this.sortOrder = sortByName;
    this.order = this.sortFlag ? 'asc' : 'desc';
    this.sortBy.emit({ sortOrder: this.sortOrder, order: this.order });
  }

  ngOnInit() { }
}
