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
  @Input()
  viewData: {
    routeTo: string;
    filters: boolean;
    search: boolean;
    viewDetails: boolean;
    filterList: string[];
    currentModule: string;
  };
  @Output() filterEvent = new EventEmitter<any>();
  displayDropdown: boolean = false;
  filtersData;
  filterArray = [];

  filterSelected: any = {
    batchId: [],
    teamId: [],
    zoneId: [],
    displayFor: ''
  };

  filterFullObj = [];

  constructor(private router: Router, private server: LdDashboardService) { }

  showFilter() {
    this.displayDropdown = !this.displayDropdown;
    this.server
      .getFiltersData(this.viewData.filterList)
      .subscribe((response: any) => {
        this.filtersData = response.data;
      });
  }

  selectFilter(filter, filterName) {
    let filterTypeId = "";
    switch (filter.type) {
      case "batch": {
        filterTypeId = "batchId";
        break;
      }
      case "team": {
        filterTypeId = "teamId";
        break;
      }
      case "zone": {
        filterTypeId = "zoneId";
        break;
      }
      case "displayFor": {
        filterTypeId = "displayFor";
      }
    }

    if (!this.filterArray.includes(filterName.name)) {
      this.filterArray.push(filterName.name);
      this.filterSelected[filterTypeId].push(filterName.id);

      this.filterFullObj.push({
        type: filterTypeId,
        id: filterName.id,
        name: filterName.name
      });

      console.log("this.filterFullObj", this.filterFullObj);
    } else {
      let i = this.filterArray.indexOf(filterName.name);
      this.filterArray.splice(i, 1);
      let j = this.filterSelected[filterTypeId].indexOf(filterName.name);
      this.filterSelected[filterTypeId].splice(j, 1);

      for (let k in this.filterFullObj) {
        if (filterName.name == this.filterFullObj[k].name) {
          this.filterFullObj.splice(0, 1);
        }
      }
    }

    // if (!this.filterSelected[filterTypeId].includes(filterName.id)) {
    //   this.filterSelected[filterTypeId].push(filterName.id);
    // } else {
    //   let i = this.filterSelected[filterTypeId].indexOf(filterName.name);
    //   this.filterSelected[filterTypeId].splice(i, 1);
    // }

    this.filterEvent.emit(this.filterSelected);
  }

  closeDropDown() {
    this.displayDropdown = false;
  }

  removeFromFilterBody(filterBodyName, index) {
    for (let i in this.filterFullObj) {
      if (filterBodyName == this.filterFullObj[i].name) {
        this.filterSelected[this.filterFullObj[i].type].splice(
          this.filterSelected[this.filterFullObj[i].type].indexOf(
            this.filterFullObj[i].id
          ),
          1
        );
        this.filterFullObj.splice(this.filterFullObj[i], 1);
        this.filterArray.splice(index, 1);
        this.filterEvent.emit(this.filterSelected);
      }
    }
  }

  routetoFullview() {
    this.router.navigate([this.viewData.routeTo]);
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) { }
}
