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

  filterSelected:any = {};
  showFilter() {
    this.displayDropdown = !this.displayDropdown;
    this.server
      .getFiltersData(this.viewData.filterList)
      .subscribe((response: any) => {
        this.filtersData = response.data;
        console.log("filtersData", this.filtersData);
        // for (let type in this.filtersData) {
        //   Object.defineProperty(
        //     this.filterSelected,
        //     this.filtersData[type].type+"Id",
        //     {
        //       value: []
        //     }
        //   );
        // }
        // console.log("filterSelected",this.filterSelected);
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
    let filterType:string = filter.type + "Id";
    if (!this.filterSelected.hasOwnProperty(filterType)) {
      Object.defineProperty(this.filterSelected, filterType, { value: [] });
      this.filterSelected[filterType].push(filterName.id);
    } 
    // else if (this.filterSelected.filterType.includes(filterName.id)) {
    //   let id = this.filterSelected.filterType.indexOf(filterName.id);
    //   this.filterSelected.filterType.splice(id, 1);
    // } 
    else {
      this.filterSelected[filterType].push(filterName.id);
    }
    console.log("this.filterSelected before stringify", this.filterSelected);
    JSON.stringify(this.filterSelected);
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
