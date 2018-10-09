import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { _ } from 'underscore';
import { LdDashboardService } from '../../ld-dashboard/services/ld-dashboard.service';

@Component({
    selector: 'app-filter-widget',
    templateUrl: './filter-widget.component.html',
    styleUrls: ['./filter-widget.component.scss']
})

export class FilterWidgetComponent implements OnInit, OnChanges {

    @Input() filtersInfo: {
        routeTo: string,
        filters: boolean,
        search: boolean,
        viewDetails: boolean,
        filterList: string[],
        currentModule: string,
        viewDetailsFilters: boolean,
        appliedFilters: any[]
    };

    @Input() searchFilterData: {
        searchComponent: string;
        searchBy: string;
        searchCount: number;
    };

    @Output() searchEvent = new EventEmitter<any>();
    @Output() addFilterEmit = new EventEmitter<any>();


    filtersList: any[];
    displayDropdown = false;
    noSearchResultFlag = true;

    searchList = [];

    filterDisplayName = 'Add a Filter';

    constructor(private router: Router, private server: LdDashboardService) { }

    closeDropDown() {
        this.displayDropdown = false;
    }

    filterDispalyNameFraming() {
        if (this.filtersInfo.filterList.length > 1) {
            this.filterDisplayName = 'Add a Filter';
        } else if (this.filtersInfo.filterList.length === 1) {
            this.filterDisplayName = this.filtersInfo.filterList[0].replace(/^\w/, c => c.toUpperCase());
        }
    }

    showFilter() {
        this.filtersList = [];
        this.server.getFiltersData(this.filtersInfo.filterList).subscribe((response: any) => {
            this.filtersList = response.data;
            this.displayDropdown = this.filtersList.length > 0 ? true : false;
        });
    }

    selectFilter(filterType, filterObj) {
        const selectedFilter = {
            type: filterType.type,
            id: filterObj.id,
            name: filterObj.name
        };

        const indexF = _.findIndex(this.filtersInfo.appliedFilters, selectedFilter);
        if (indexF === -1 && this.filtersInfo.appliedFilters.length < 5) {
            this.filtersInfo.appliedFilters.push(selectedFilter);
            this.addFilterEmit.emit(this.filtersInfo.appliedFilters);
        } else if (indexF !== -1) {
            this.filtersInfo.appliedFilters.splice(indexF, 1);
            this.addFilterEmit.emit(this.filtersInfo.appliedFilters);
        }
    }

    removeFilter(filter) {
        this.filtersInfo.appliedFilters.splice(_.findIndex(this.filtersInfo.appliedFilters, filter), 1);
        this.addFilterEmit.emit(this.filtersInfo.appliedFilters);
    }

    routetoFullview() {
        this.router.navigate([this.filtersInfo.routeTo]);
    }

    searchItem($event) {
        if ($event.target.value.length >= 3) {
            this.displayDropdown = true;
            this.searchList = [];
            this.noSearchResultFlag = false;
            this.server.getSearchFilterData(this.searchFilterData, $event.target.value).subscribe((response: any) => {
                this.searchList = response.data;
                this.noSearchResultFlag = this.searchList.length > 0 ? false : true;
            });
        }
    }

    selectSearchItem(searchItem) {
        if (_.findIndex(this.filtersInfo.appliedFilters, searchItem) === -1
            && this.filtersInfo.appliedFilters.length < this.searchFilterData.searchCount) {
            this.filtersInfo.appliedFilters.push(searchItem);
        } else if (_.findIndex(this.filtersInfo.appliedFilters, searchItem) !== -1) {
            this.removeSearchName(_.findIndex(this.filtersInfo.appliedFilters, searchItem));
        }

        this.searchEvent.emit(this.filtersInfo.appliedFilters);
    }

    removeSearchName(i) {
        this.filtersInfo.appliedFilters.splice(i, 1);
        this.searchEvent.emit(this.filtersInfo.appliedFilters);
    }

    checkItemInApplied(array, item) {
        const itemFound = (_.findIndex(array, item) === -1) ? false : true;
        return itemFound;
    }

    onClickedOutside(e: Event) {
        this.displayDropdown = false;
    }

    ngOnInit() {
        if (this.filtersInfo.filters === true) {
            this.filterDispalyNameFraming();
        }
    }

    ngOnChanges(changes: any) {
        if (this.filtersInfo.filterList) {
            this.filterDispalyNameFraming();
        }
    }
}
