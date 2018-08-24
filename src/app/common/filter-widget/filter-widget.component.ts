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
  filtersInfo: {
    routeTo: string,
    filters: boolean,
    search: boolean,
    viewDetails: boolean,
    filterList: string[],
    currentModule: string,
    viewDetailsFilters: boolean,
    appliedFilters: any[]
  };
  // @Input() filterName: string[];
  // @Input() appliedFilters: any[];

  @Input()
  searchFilterData: {
    searchComponent: string;
    searchBy: string;
  };

  @Output() filterEvent = new EventEmitter<any>();
  @Output() searchEvent = new EventEmitter<any>();
  @Output() addFilterEmit = new EventEmitter<any>();
  @Output() removeFilterEmit = new EventEmitter<any>();

  filtersList;
  displayDropdown: boolean = false;
  noSearchResultFlag: boolean = true;

  filterArray = [];

  searchList = [];
  searchNames = [];

  viewDetailsDisplay: boolean = false;

  // filterDisplayName = "";
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

    if (this.filtersInfo.filterList.length > 1) {
      this.filterDisplayName = "Add a Filter";
    } else {
      this.filterDisplayName = this.filtersInfo.filterList[0].replace(/^\w/, c => c.toUpperCase());
      // switch (this.filtersInfo.filterList[0]) {
      //   case "location": {
      //     this.filterDisplayName = "Location";
      //     break;
      //   }
      //   case "batch": {
      //     this.filterDisplayName = "Batch";
      //     break;
      //   }
      //   case "team": {
      //     this.filterDisplayName = "Team";
      //     break;
      //   }
      //   case "course": {
      //     this.filterDisplayName = "Course";
      //     break;
      //   }
      //   case "zone": {
      //     this.filterDisplayName = "Zone";
      //     break;
      //   }
      //   case "contentType": {
      //     this.filterDisplayName = "Content Type";
      //     break;
      //   }
      // }
    }
  }

  showFilter() {
    this.filtersList = [];
    this.server
      .getFiltersData(this.filtersInfo.filterList)
      .subscribe((response: any) => {
        this.filtersList = response.data;
        this.displayDropdown = this.filtersList.length > 0 ? true : false;
      });
  }

  selectFilter(filterType, filterObj) {
    let selectedFilter = {
      type: filterType.type,
      id: filterObj.id,
      name: filterObj.name
    }

    if (_.findIndex(this.filtersInfo.appliedFilters, selectedFilter) == -1) {
      this.addFilterEmit.emit(selectedFilter);
    }
    else if (_.findIndex(this.filtersInfo.appliedFilters, selectedFilter) != -1) {
      this.removeFilterEmit.emit(selectedFilter);
    }

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
    this.router.navigate([this.filtersInfo.routeTo]);
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
    // this.filterDispalyNameFraming();
  }

  ngOnChanges(changes: any) {
    // if (changes.filtersInfo.filterList) {
    //   this.filterDispalyNameFraming();
    // }
    // this.filterDispalyNameFraming();
  }
}
