import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LdDashboardService } from '../services/ld-dashboard.service';


import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

import { _ } from 'underscore';

@Component({
  selector: 'app-org-interest-widget',
  templateUrl: './org-interest-widget.component.html',
  styleUrls: ['./org-interest-widget.component.scss']
})
export class OrgInterestWidgetComponent implements OnInit {
  routePath = 'orgInterestFullView';
  filtersData = {
    routeTo: 'orgInterestFullView',
    filters: false,
    search: true,
    viewDetails: true,
    filterList: [],
    appliedFilters: [],
  };

  searchFilterData = {
    searchComponent: 'organization-interests',
    searchBy: 'courseName',
    searchCount: '3'
  };

  filterbody = {};
  orgData: any[];
  orgPopularTopicData: any[];
  actualResponseData: any[];

  displayData: any[];

  // searchFilterItem = [];

  spinner_loader = false;
  noDataFlag = false;

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.orgData = [];
    this.dashboardService.getOrgInterestData().subscribe((res: any) => {
      this.orgData = this.actualResponseData = res.data;
      // this.constructNewArray();
      this.spinner_loader = false;
      this.noDataFlag = this.orgData.length === 0 ? true : false;
    });

    this.dashboardService
      .getOrgPopulatTopicsData()
      .subscribe((response: any) => {
        this.orgPopularTopicData = response.data;
      });
  }

  downloadPdf() {
    const htmlTemp = document.getElementById('org-interest');
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

  constructNewArray() {
    const tempArray = [];
    const firstArray = [];
    this.displayData = [];
    // tslint:disable-next-line:forin
    for (const p in this.orgData) {
      tempArray.push(this.orgData[p]);
    }
    console.log(tempArray);

    if (this.filtersData.appliedFilters.length > 0) {
      // tslint:disable-next-line:forin
      for (const i in this.filtersData.appliedFilters) {
        const foundAtIndex = _.findIndex(tempArray, this.filtersData.appliedFilters[i]);
        // tempArray = _.without(tempArray, this.filtersData.appliedFilters[i]);
        if (foundAtIndex !== -1) {
          tempArray.splice(foundAtIndex, 1);
        }
        this.filtersData.appliedFilters[i]['new'] = true;
      }
    }

    for (let s = 0; s < (3 - this.filtersData.appliedFilters.length); s++) {
      firstArray.push(tempArray[s]);
    }
    this.displayData = firstArray.concat(this.filtersData.appliedFilters);



  }

  getSearchItem($event) {
    this.filtersData.appliedFilters = $event;
    // this.constructNewArray();

    // tslint:disable-next-line:forin
    for (const i in this.filtersData.appliedFilters) {
      this.filtersData.appliedFilters[i]['new'] = true;
    }

    this.orgData = JSON.parse(JSON.stringify(this.actualResponseData));

    if (this.filtersData.appliedFilters.length > 0) {
      this.orgData.splice(-this.filtersData.appliedFilters.length);
    }

    this.orgData = this.orgData.concat(this.filtersData.appliedFilters);
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
