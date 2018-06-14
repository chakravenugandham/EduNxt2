import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  EventEmitter,
  Output
} from "@angular/core";
import { Router, Route } from "@angular/router";

import { LdDashboardService } from "../../services/ld-dashboard.service";
import { values } from "d3";

@Component({
  selector: "app-filter-widget",
  templateUrl: "./filter-widget.component.html",
  styleUrls: ["./filter-widget.component.scss"]
})
export class FilterWidgetComponent implements OnInit {
  // @Output() filterSelected = new EventEmitter<any>();
  @Output() filterEvent = new EventEmitter<any>();
  filterArray = [];

  @Input()
  viewData: {
    routeTo: string;
    filters: boolean;
    search: boolean;
    filterList: string[];
    currentModule: string;
  };

  displayDropdown: boolean = false;

  constructor(private router: Router, private server: LdDashboardService) {}

  // filtersList = ["zone", "team"];
  filtersData;

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

  // filter = {
  //   zoneId: [1, 2, 3],
  //   teamId: [3, 7]
  // };
  filterSelected = {
    teamId: []
  };

  tempfilterArray = [];
  selectFilter(filter, filterName) {
    console.log("filter", filter);
    console.log("filterName", filterName);
    // this.filterArray.push(filterName.name);
    this.filterArray.push({filterType: filter.type,filterName: filterName.name,filterId:filterName.id});
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
}

