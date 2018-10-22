import { Component, OnInit, OnDestroy } from '@angular/core';
import { LdDashboardService } from '../services/ld-dashboard.service';
import { CommonService } from '../../common-services/common.service';

import { _ } from 'underscore';

import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-org-performance-widget',
  templateUrl: './org-performance-widget.component.html',
  styleUrls: ['./org-performance-widget.component.scss']
})
export class OrgPerformanceWidgetComponent implements OnInit, OnDestroy {

  tooltipText: string;
  responseSubscriber: Subscription;

  sortOrder = 'testPerformance';
  order = 'desc';

  // filters data
  filtersData = {
    routeTo: 'orgPerformanceFullView',
    filters: false,
    search: true,
    viewDetails: true,
    filterList: [],
    appliedFilters: [],
    currentModule: ''
  };

  searchFilterData = {
    searchComponent: 'learner-leaderboard',
    searchBy: 'learnerName',
    searchCount: '5',
    searchedUsers: []
  };
  searchString = '';

  responseData = [];

  displayData = [];

  actualResponseData = [];

  teamsSearchItems = [];
  trainersSearchItems = [];
  learnersSearchItems = [];

  spinner_loader = false;
  noDataFlag = false;

  pagination = {
    page: 1,
    limitTo: 5,
    total: 0
  };

  constructor(private dashboardService: LdDashboardService, private filterData: CommonService) {
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

  teamsFn() {
    this.tooltipText = 'Teams';
    this.filtersData.currentModule = 'teams';
    this.searchFilterData.searchComponent = 'team-leaderboard';
    this.searchFilterData.searchBy = 'teamName';
    this.filtersData.appliedFilters = this.teamsSearchItems;
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.sortOrder = 'teamName';
    this.getDataFromService();
  }
  trainersFn() {
    this.tooltipText = 'Trainers';
    this.filtersData.currentModule = 'trainers';
    this.searchFilterData.searchComponent = 'trainer-leaderboard';
    this.searchFilterData.searchBy = 'trainerName';
    this.filtersData.appliedFilters = this.trainersSearchItems;
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.sortOrder = 'trainerName';
    this.getDataFromService();
  }
  learnersFn() {
    this.tooltipText = 'Learners';
    this.filtersData.currentModule = 'learners';
    this.searchFilterData.searchComponent = 'learner-leaderboard';
    this.searchFilterData.searchBy = 'learnerName';
    this.filtersData.appliedFilters = this.learnersSearchItems;
    localStorage.setItem('orgPerformaModule', this.filtersData.currentModule);
    this.sortOrder = 'testPerformance';
    this.getDataFromService();
  }

  downloadPdf() {
    const htmlTemp = document.getElementById('org-performance');
    html2canvas(htmlTemp).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('./');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

      pdf.save('EduNxtReport.pdf'); // Generated PDF
    });

  }

  sortBy($event) {
    if (this.sortOrder == $event) {
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
    this.sortOrder = $event;
    this.getDataFromService();
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.responseData = [];
    this.responseSubscriber = this.dashboardService.getPerformanceDetails(this.searchFilterData, this.searchString, this.pagination, this.sortOrder, this.order).subscribe((response: any) => {
      this.responseData = this.displayData = this.actualResponseData = [...response.data];
      this.constructNewArrayTwo();
      this.spinner_loader = false;
      this.noDataFlag = this.responseData.length === 0 ? true : false;
    });

    // this.responseSubscriber.unsubscribe();
  }

  constructNewArrayTwo() {
    let tempArray = [];
    let trueArray = [];
    let falseArray = [];
    this.displayData = [];
    let searchData = JSON.parse(JSON.stringify(this.filtersData.appliedFilters));
    tempArray = JSON.parse(JSON.stringify(this.responseData));
    if (searchData.length > 0) {
      falseArray = _.filter(tempArray, function (obj) {
        return _.findIndex(searchData, obj) === -1;
      })

      searchData.forEach(function (obj) {
        obj.new = true;
        trueArray.push(obj);
      })

      let len = 5 - trueArray.length;
      falseArray = falseArray.splice(falseArray.length - len);
      tempArray = _.union(falseArray, trueArray);
    }
    this.displayData = tempArray;
  }

  constructNewArray() {

    for (let i in this.filtersData.appliedFilters) {
      this.filtersData.appliedFilters[i]["new"] = true;
    }

    this.displayData = [];
    let tempArray = [];

    for (let i = 0; i < (this.responseData.length - this.filtersData.appliedFilters.length); i++) {
      tempArray.push(this.responseData[i]);
    }
    this.displayData = tempArray.concat(this.filtersData.appliedFilters);

  }

  getSearchItem($event) {
    this.filtersData.appliedFilters = $event;
    this.constructNewArrayTwo();
  }

  ngOnInit() {
    this.learnersFn();
  }

  ngOnDestroy() {
    this.responseSubscriber.unsubscribe();
  }
}
