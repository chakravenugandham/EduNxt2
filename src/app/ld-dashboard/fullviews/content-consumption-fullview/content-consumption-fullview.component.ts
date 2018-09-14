import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from '../../services/ld-dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content-consumption-fullview',
  templateUrl: './content-consumption-fullview.component.html',
  styleUrls: ['./content-consumption-fullview.component.scss']
})
export class ContentConsumptionFullviewComponent implements OnInit {

  filtersData = {
    routeTo: 'contentConsumptionFullView',
    filters: true,
    search: false,
    viewDetails: false,
    filterList: ['contentType'],
    viewDetailsFilters: true,
    currentModule: '',
    appliedFilters: []
  };

  contentData = [];

  searchFilterData = {
    searchBy: 'contentName'
  };

  searchString = '';

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0,
    total_pages: 0
  };

  sortOrder = 'contentName';
  order = 'asc';
  searchBox = false;

  spinner_loader = false;
  noDataFlag = false;

  constructor(private dashboardService: LdDashboardService, private route: ActivatedRoute) {
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

  getDataFromService() {
    window.scrollTo(0, 0);
    this.spinner_loader = true;
    this.contentData = [];
    this.dashboardService
      .getContentData(this.searchFilterData, this.searchString, this.filtersData.appliedFilters, this.pagination, this.sortOrder, this.order)
      .subscribe((response: any) => {
        this.contentData = response.data;
        this.pagination.total = response.pagination.total;
        this.pagination.total_pages = response.pagination.total_pages;
        this.spinner_loader = false;
        this.noDataFlag = response.data.length === 0 ? true : false;
      });
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
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

  addFilters($event) {
    this.filtersData.appliedFilters = $event;
    this.getDataFromService();
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
