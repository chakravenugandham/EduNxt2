import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from '../../services/ld-dashboard.service';

@Component({
  selector: 'app-org-interest-fullview',
  templateUrl: './org-interest-fullview.component.html',
  styleUrls: ['./org-interest-fullview.component.scss']
})
export class OrgInterestFullviewComponent implements OnInit {
  // global variable declarations
  responseData = [];
  filterbody = {};
  filtersData = {
    routeTo: 'orgInterestFullView',
    filters: false,
    search: false,
    viewDetails: false,
    filterList: ['zone'],
    viewDetailsFilters: false
  };

  sortOrder = 'courseName';
  order = 'desc';
  searchBox = false;


  spinner_loader = false;
  noDataFlag = false;

  searchFilterData = {
    searchBy: 'courseName'
  };

  searchString = '';

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0,
    total_pages: 0
  };

  // dropdown display values
  displayFor = {};

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  // api call for orgDetails based on component
  getDataFromService() {
    this.spinner_loader = true;
    this.responseData = [];
    this.dashboardService.getOrgInterestDetailsData(this.searchFilterData, this.searchString, this.pagination, this.sortOrder, this.order)
      .subscribe((response: any) => {
        this.responseData = response.data;
        this.pagination.total = response.pagination.total;
        this.pagination.total_pages = response.pagination.total_pages;

        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length === 0 ? true : false;
      });
  }

  searchFn() {
    this.searchBox = true;
  }

  closeSearchFn() {
    this.searchBox = false;
  }


  getDisplayObject($event) {
    this.displayFor = $event;
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    window.scrollTo(0, 0);
    if (this.sortOrder == sortByName) {
      if (this.order == 'asc') {
        this.order = 'desc';
      }
      else if (this.order == 'desc') {
        this.order = 'asc';
      }
    }
    else {
      this.order = 'asc';
    }
    this.getDataFromService();
  }

  gotoPage($event) {
    this.pagination.page = $event;
    this.getDataFromService();
  }

  ngOnInit() {
    this.sortByFn(this.sortOrder);
  }
}
