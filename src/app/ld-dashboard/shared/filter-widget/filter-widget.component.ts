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

  displayDropdown:boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    // console.log("changes", changes.viewData);
  }

  constructor(private router: Router, private server: LdDashboardService) {}
  ngOnInit() {}

  filtersList = ["zone", "team"];

  filtersData;

  showFilter() {
    console.log("this.displayDropdown",this.displayDropdown);
    this.displayDropdown = !this.displayDropdown;
    console.log("filtersData", this.viewData);
    this.server.getFiltersData(this.filtersList).subscribe((response: any) => {
      // this.filtersData.push(response.data);
      this.filtersData = response.data;
      console.log("filtersData Response", this.filtersData);
      let evilResponseProps = Object.keys(this.filtersData);
      console.log("evilResponseProps", evilResponseProps);
    });
    console.log("type of filtesData", typeof this.filtersData);
  }

  selectFilter(filter, filterName) {
    console.log("parent filterName", filter);
    console.log("filterName", filterName);
    
  }
  applyFilters(){
    this.displayDropdown = false;
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
    // console.log("viewData", this.viewData);
    this.router.navigate([this.viewData.routeTo]);
  }
}

// http://192.168.239.38:3000/api/v1/dropDown?type=zone,team
// http://192.168.239.38:3000/api/v1/dropdown?type=zone,team
