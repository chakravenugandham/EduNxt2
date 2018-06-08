import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Router, Route } from "@angular/router";

import { LdDashboardService } from "../../services/ld-dashboard.service";
import { values } from "d3";

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

  displayDropdown: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    // console.log("changes", changes.viewData);
  }

  constructor(private router: Router, private server: LdDashboardService) {}
  ngOnInit() {}

  filtersList = ["zone", "team"];

  filtersData;

  showFilter() {
    this.displayDropdown = !this.displayDropdown;
    this.server.getFiltersData(this.filtersList).subscribe((response: any) => {
      this.filtersData = response.data;
      let evilResponseProps = Object.keys(this.filtersData);
    });
  }

  filter = {
    zoneId: [1, 2, 3],
    teamId: [3, 7]
  };
  tempfilterArray = [];
  selectFilter(filter, filterName) {
    console.log("parent filterName", filter);
    console.log("filterName", filterName);
    this.tempfilterArray.push(filterName.name);
  }
  applyFilters() {
    this.displayDropdown = false;
    this.filterArray = this.tempfilterArray;
    console.log("filterArray", this.filterArray);
    
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
    this.router.navigate([this.viewData.routeTo]);
  }
}
// http://192.168.239.38:3000/api/v1/dropdown?type=zone,team
