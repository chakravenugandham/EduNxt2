import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from '../services/ld-dashboard.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

import { _ } from 'underscore';

@Component({
  selector: 'app-content-performance-widget',
  templateUrl: './content-performance-widget.component.html',
  styleUrls: ['./content-performance-widget.component.scss']
})
export class ContentPerformanceWidgetComponent implements OnInit {

  sortOrder = 'views';
  order: string = 'desc';

  pagination = {
    page: 1,
    limitTo: 5,
    total: 0
  };

  closeResult: string;
  filtersData = {
    routeTo: 'contentConsumptionFullView',
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ['contentType'],
    viewDetailsFilters: false,
    appliedFilters: []
  };

  contentObject = {
    filters: ['contentType'],
    appliedFilters: [],
    responseData: []
  };

  searchFilterData = {
    searchBy: 'contentName'
  };

  searchString = '';

  spinner_loader = false;
  noDataFlag = false;

  constructor(private dashboardService: LdDashboardService, private modalService: NgbModal) {
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
    this.contentObject.responseData = [];
    this.dashboardService
      .getContentData(this.searchFilterData, this.searchString, this.filtersData.appliedFilters, this.pagination, this.sortOrder, this.order)
      .subscribe((res: any) => {
        this.contentObject.responseData = res.data;
        this.spinner_loader = false;
        this.noDataFlag = this.contentObject.responseData.length === 0 ? true : false;
      });
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  downloadPdf() {
    const htmlTemp = document.getElementById('content-consumption');
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

  addFilters($event) {
    this.filtersData.appliedFilters = $event;
    this.getDataFromService();
  }

  ngOnInit() {
    this.filtersData.appliedFilters = this.contentObject.appliedFilters;
    this.getDataFromService();
  }
}
