import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from '../services/ld-dashboard.service';
import { CommonService } from '../../common-services/common.service';


import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

import { _ } from 'underscore';

@Component({
  selector: 'app-org-performance-widget',
  templateUrl: './org-performance-widget.component.html',
  styleUrls: ['./org-performance-widget.component.scss']
})
export class OrgPerformanceWidgetComponent implements OnInit {

  tooltipText: string;

  sortOrder = 'learnerName';
  order = 'asc';

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
    this.dashboardService.getPerformanceDetails(this.searchFilterData, this.searchString, this.pagination, this.sortOrder, this.order)
      .subscribe(
        (response: any) => {
          this.responseData = this.displayData = this.actualResponseData = response.data;
          this.constructNewArray();
          this.spinner_loader = false;
          this.noDataFlag = this.responseData.length === 0 ? true : false;
        });
  }

  constructNewArrayTwo() {
    const tempArray = [];
    const firstArray = [];
    this.displayData = [];
    // tslint:disable-next-line:forin
    for (const p in this.responseData) {
      tempArray.push(this.responseData[p]);
    }
    console.log(tempArray);

    if (this.filtersData.appliedFilters.length > 0) {
      // tslint:disable-next-line:forin
      for (const i in this.filtersData.appliedFilters) {
        const foundAtIndex = _.findIndex(tempArray, this.filtersData.appliedFilters[i]);
        // tempArray = _.without(tempArray, this.filtersData.appliedFilters[i]);
        console.log(this.filtersData.appliedFilters[i]);
        console.log(foundAtIndex);

        if (foundAtIndex !== -1) {
          tempArray.splice(foundAtIndex, 1);
        }
        this.filtersData.appliedFilters[i]['new'] = true;
      }
    }

    // tslint:disable-next-line:forin
    // for (const i in this.filtersData.appliedFilters) {
    //   this.filtersData.appliedFilters[i]['new'] = true;
    // }

    // for (let i = 0; i < (this.responseData.length - this.filtersData.appliedFilters.length); i++) {
    //   tempArray.push(this.responseData[i]);
    // }

    for (let s = 0; s < (5 - this.filtersData.appliedFilters.length); s++) {
      firstArray.push(tempArray[s]);
    }
    this.displayData = firstArray.concat(this.filtersData.appliedFilters);

    // if (this.filtersData.appliedFilters.length === 0) {
    //   this.displayData = tempArray;
    // } else if (this.filtersData.appliedFilters.length > 1) {
    //   this.displayData = tempArray.slice(0, -(this.filtersData.appliedFilters.length)).concat(this.filtersData.appliedFilters);
    // }



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

    this.constructNewArray();

    // for (let i in this.filtersData.appliedFilters) {
    //   this.filtersData.appliedFilters[i]["new"] = true;
    // }

    // this.responseData = JSON.parse(JSON.stringify(this.actualResponseData));

    // if (this.filtersData.appliedFilters.length > 0)
    //   this.responseData.splice(-this.filtersData.appliedFilters.length);

    // this.displayData = [];
    // let tempArray = [];

    // for (let i = 0; i < (this.responseData.length - this.filtersData.appliedFilters.length); i++) {
    //   tempArray.push(this.responseData[i]);
    // }
    // this.displayData = tempArray.concat(this.filtersData.appliedFilters);


    // this.responseData = this.responseData.concat(this.filtersData.appliedFilters);
  }

  ngOnInit() {
    this.learnersFn();
  }
}
