import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  Output
} from "@angular/core";
import { Router } from "@angular/router";
import { _ } from "underscore";

import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";

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
    viewDetailsFilters: boolean;
  };
  @Input() filterName: string[];
  @Input() appliedFilters: any[];

  @Input()
  searchFilterData: {
    searchComponent: string;
    searchBy: string;
  };

  @Output() filterEvent = new EventEmitter<any>();
  @Output() searchEvent = new EventEmitter<any>();
  @Output() addFilterEmit = new EventEmitter<any>();
  @Output() removeFilterEmit = new EventEmitter<any>();

  filtersData;
  displayDropdown: boolean = false;
  noSearchResultFlag: boolean = true;

  filterArray = [];

  searchList = [];
  searchNames = [];

  viewDetailsDisplay: boolean = false;
  filterDisplayName = "Add a Filter";

  filterSelected: any = {
    batchId: [],
    quizName: [],
    assignmentName: [],
    locationId: [],
    teamId: [],
    zoneId: [],
    contentType: []
  };

  filterFullObj = [];

  filterComponent: string;
  filterDisplay: boolean = false;

  constructor(private router: Router, private server: LdDashboardService) { }

  closeDropDown() {
    this.displayDropdown = false;
  }

  filterDispalyNameFraming() {
    if (this.viewData.filterList.length > 1) {
      this.filterDisplayName = "Add a Filter";
    } else {
      switch (this.viewData.filterList[0]) {
        case "location": {
          this.filterDisplayName = "Location";
          break;
        }
        case "batch": {
          this.filterDisplayName = "Batch";
          break;
        }
        case "team": {
          this.filterDisplayName = "Team";
          break;
        }
        case "course": {
          this.filterDisplayName = "Course";
          break;
        }
        case "zone": {
          this.filterDisplayName = "Zone";
          break;
        }
        case "contentType": {
          this.filterDisplayName = "Content Type";
          break;
        }
      }
    }
  }

  showFilter() {
    this.filtersData = [];
    this.server
      .getFiltersData(this.viewData.filterList)
      .subscribe((response: any) => {
        this.filtersData = response.data;
        this.displayDropdown = this.filtersData.length > 0 ? true : false;
      });
  }

  selectFilter(filter, filterName) {
    let selectedFilter = {
      type: filter.type,
      id: filterName.id,
      name: filterName.name
    }

    if (_.findIndex(this.appliedFilters, selectedFilter) == -1) {
      this.addFilterEmit.emit(selectedFilter);
    }
    else if (_.findIndex(this.appliedFilters, selectedFilter) != -1) {
      this.removeFilterEmit.emit(selectedFilter);
    }

    // let filterTypeId = "";
    // switch (filter.type) {
    //   case "location": {
    //     filterTypeId = "locationId";
    //     break;
    //   }
    //   case "batch": {
    //     filterTypeId = "batchId";
    //     break;
    //   }
    //   case "quiz": {
    //     filterTypeId = "quizName";
    //     break;
    //   }
    //   case "assignment": {
    //     filterTypeId = "assignmentName";
    //     break;
    //   }
    //   case "team": {
    //     filterTypeId = "teamId";
    //     break;
    //   }
    //   case "course": {
    //     filterTypeId = "courseId";
    //     break;
    //   }
    //   case "zone": {
    //     filterTypeId = "zoneId";
    //     break;
    //   }
    //   case "contentType": {
    //     filterTypeId = "contentType";
    //     break;
    //   }
    // }

    // if (!this.filterArray.includes(filterName.name)) {
    //   this.filterArray.push(filterName.name);
    //   this.filterSelected[filterTypeId].push(filterName.id);

    //   this.filterFullObj.push({
    //     type: filterTypeId,
    //     id: filterName.id,
    //     name: filterName.name
    //   });
    // } else {
    //   let i = this.filterArray.indexOf(filterName.name);
    //   this.filterArray.splice(i, 1);
    //   let j = this.filterSelected[filterTypeId].indexOf(filterName.name);
    //   this.filterSelected[filterTypeId].splice(j, 1);

    //   for (let k in this.filterFullObj) {
    //     if (filterName.name == this.filterFullObj[k].name) {
    //       this.filterFullObj.splice(0, 1);
    //     }
    //   }
    // }

    // this.filterEvent.emit(this.filterSelected);
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

  removeFilter(filter) {
    this.removeFilterEmit.emit(filter);
  }

  routetoFullview() {
    this.router.navigate([this.viewData.routeTo]);
  }

  searchItem($event) {
    if ($event.target.value.length >= 3) {
      this.displayDropdown = true;
      this.searchList = [];
      this.noSearchResultFlag = false;
      this.server
        .getSearchFilterData(this.searchFilterData, $event.target.value)
        .subscribe((respose: any) => {
          this.searchList = respose.data;
          this.noSearchResultFlag = this.searchList.length > 0 ? false : true;
        });
    } else {
      this.displayDropdown = false;
    }
  }

  checkItemInApplied(array, item) {
    let itemFound = (_.findIndex(array, item) == -1) ? false : true;
    return itemFound;
  }

  selectSearchItem(searchItem) {
    if (_.findIndex(this.searchNames, searchItem) == -1 && this.searchNames.length < 3) {
      this.searchNames.push(searchItem);
    }
    else if (_.findIndex(this.searchNames, searchItem) != -1) {
      this.removeSearchName(_.findIndex(this.searchNames, searchItem))
    }
    this.searchEvent.emit(this.searchNames);
  }
  removeSearchName(i) {
    this.searchNames.splice(i, 1);
    this.searchEvent.emit(this.searchNames);
  }

  ngOnInit() {
    if (this.viewData.filters) {
      this.viewData.filterList = this.filterName;
      this.filterDispalyNameFraming();
    }
    this.viewDetailsDisplay = this.viewData.viewDetailsFilters;
  }

  ngOnChanges(changes: any) {
    if (this.viewData.filters) {
      this.viewData.filterList = this.filterName;
      this.filterDispalyNameFraming();
    }
  }
}
