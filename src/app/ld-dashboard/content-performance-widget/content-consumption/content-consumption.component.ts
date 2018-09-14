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
  order: string = 'asc';

  // sortOrder: string = "contentName";
  reverse: boolean = false;

  constructor() { }

  sortByFn(sortByName) {
    if (this.sortOrder == sortByName) {
      if (this.order == 'asc') {
        this.order = 'desc';
      }
      else if (this.order == 'desc') {
        this.order = 'asc';
      }
    }
    else {
      this.order = 'asc';
    }
    this.sortOrder = sortByName;
    this.sortBy.emit({ sortOrder: this.sortOrder, order: this.order });
  }

  ngOnInit() { }
}
