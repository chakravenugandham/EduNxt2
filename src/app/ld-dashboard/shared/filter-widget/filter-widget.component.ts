import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router, Route } from "@angular/router";

@Component({
  selector: "app-filter-widget",
  templateUrl: "./filter-widget.component.html",
  styleUrls: ["./filter-widget.component.scss"]
})
export class FilterWidgetComponent implements OnInit, OnChanges {
  //@Input() routePath: string;
  filterArray = [];

  @Input() viewData : {
    routeTo: string,
    filters: boolean,
    search: boolean,
    filterList: string[]
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("changes", changes.viewData);
    
    // for(let propertyName in changes){
    //   console.log("changes",changes[propertyName]);
    // }
  }

  constructor(private router: Router) {}
  ngOnInit() {}

  addFilter() {
    this.filterArray.push("Batch");
    console.log("filterArray", this.filterArray);
  }
  removeFilter(i) {
    console.log("removable filter index", i);
    this.filterArray.splice(i, 1);
    console.log("filterArray", this.filterArray);
  }
  routetoFullview() {
    console.log("viewData", this.viewData);
    //this.router.navigate([this.viewData.routeTo]);
  }
}
