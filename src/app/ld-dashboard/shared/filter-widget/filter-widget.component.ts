import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output
} from "@angular/core";
import { Router } from "@angular/router";

import { LdDashboardService } from "../../services/ld-dashboard.service";
import { values } from "d3";

@Component({
  selector: "app-filter-widget",
  templateUrl: "./filter-widget.component.html",
  styleUrls: ["./filter-widget.component.scss"]
})
export class FilterWidgetComponent implements OnInit, OnChanges {
  @Output() filterEvent = new EventEmitter<any>();
  displayDropdown: boolean = false;
  filtersData;
  filterArray = [];

  @Input()
  viewData: {
    routeTo: string;
    filters: boolean;
    search: boolean;
    viewDetails: boolean;
    filterList: string[];
    currentModule: string;
  };

  constructor(private router: Router, private server: LdDashboardService) {}

  filterSelected: any = {
    batchId: [],
    teamId: [],
    zoneId: []
  };
  showFilter() {
    this.displayDropdown = !this.displayDropdown;
    this.server
      .getFiltersData(this.viewData.filterList)
      .subscribe((response: any) => {
        this.filtersData = response.data;
        console.log("filtersData", this.filtersData);
      });
  }

  selectFilter(filter, filterName) {
    console.log("filter", filter);
    console.log("filterName", filterName);
    if (!this.filterArray.includes(filterName.name)) {
      this.filterArray.push(filterName.name);
    } else if (this.filterArray.includes(filterName.name)) {
      let i = this.filterArray.indexOf(filterName.name);
      this.filterArray.splice(i, 1);
    }

    let filterTypeId = "";
    switch (filter.type) {
      case "batch": {
        filterTypeId = "batchId";
        // this.filterSelected["batchId"].push(filterName.id);
        break;
      }
      case "team": {
        filterTypeId = "teamId";
        // this.filterSelected["teamId"].push(filterName.id);
        break;
      }
      case "zone": {
        filterTypeId = "zoneId";
        // this.filterSelected["zoneId"].push(filterName.id);
        break;
      }
    }

    if (!this.filterSelected[filterTypeId].includes(filterName.id)) {
      this.filterSelected[filterTypeId].push(filterName.id);
    } else if (this.filterSelected[filterTypeId].includes(filterName.id)) {
      let i = this.filterSelected[filterTypeId].indexOf(filterName.name);
      this.filterSelected[filterTypeId].splice(i, 1);
    }

    console.log("this.filterSelected before stringify", this.filterSelected);
    let jsonedFilter = JSON.stringify(this.filterSelected);
    console.log("jsonedFilter", jsonedFilter);

    // this.filterSelected.filterType.push(filterName.id);
    console.log("this.filterSelected after stringify", this.filterSelected);

    this.filterEvent.emit(this.filterSelected);
  }

  closeDropDown() {
    this.displayDropdown = false;
  }

  removeFilter(i) {
    console.log("removable filter index", i);
    this.filterArray.splice(i, 1);
    console.log("filterArray", this.filterArray);
  }
  removeFromFilterBody(filterBodyName) {
    console.log("filterBodyName", filterBodyName);
  }

  routetoFullview() {
    this.router.navigate([this.viewData.routeTo]);
  }

  ngOnInit() {
    // this.setFilterBody();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("something changed");
  }
}
