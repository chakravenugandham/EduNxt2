import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Router, Route } from "@angular/router";

import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-filter-widget",
  templateUrl: "./filter-widget.component.html",
  styleUrls: ["./filter-widget.component.scss"]
})
export class FilterWidgetComponent implements OnInit, OnChanges {
  // @Input() routePath: string;
  filterArray = [];

  @Input()
  viewData: {
    routeTo: string;
    filters: boolean;
    search: boolean;
    filterList: string[];
  };

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes.viewData);
  }

  constructor(private router: Router, private server: LdDashboardService) {}
  ngOnInit() {}

  showFilter() {
    this.server.getFiltersData(this.viewData.filterList).subscribe((response: any) => {
      console.log("filter Response", response);
    });
  }

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
