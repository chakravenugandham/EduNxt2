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

@Component({
  selector: "app-filter-widget",
  templateUrl: "./filter-widget.component.html",
  styleUrls: ["./filter-widget.component.scss"]
})
export class FilterWidgetComponent implements OnInit, OnChanges {
  @Output() filterEvent = new EventEmitter<any>();
  displayDropdown: boolean = false;
  filterArray = [];
  filtersData;

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

  showFilter() {
    for (let i in this.viewData.filterList) {
      Object.defineProperty(
        this.filtersData,
        this.viewData.filterList[i] + "Id",
        { value: [] }
      );
    }
    this.displayDropdown = !this.displayDropdown;
    this.server
      .getFiltersData(this.viewData.filterList)
      .subscribe((response: any) => {
        this.filtersData = response.data;
      });
  }

  filterSelected = {
    teamId: []
  };

  tempfilterArray = [];
  selectFilter(filter, filterName) {
    console.log("filter", filter);
    console.log("filterName", filterName);
    // this.filterArray.push({
    //   filterType: filter.type,
    //   filterName: filterName.name,
    //   filterId: filterName.id
    // });
    if (!this.filterArray.includes(filterName.name)) {
      this.filterArray.push(filterName.name);
    }
    else if(this.filterArray.includes(filterName.name)){
      let i = this.filterArray.indexOf(filterName.name)
      this.filterArray.splice(i,1);
    }
    console.log("filterArray", this.filterArray);
    this.filterSelected.teamId.push(filterName.id);
    console.log("this.filterSelected", this.filterSelected);
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
