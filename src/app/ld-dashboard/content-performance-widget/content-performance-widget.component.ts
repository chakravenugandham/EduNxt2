import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

import { _ } from "underscore";

@Component({
  selector: "app-content-performance-widget",
  templateUrl: "./content-performance-widget.component.html",
  styleUrls: ["./content-performance-widget.component.scss"]
})
export class ContentPerformanceWidgetComponent implements OnInit {

  pagination = {
    page: 1,
    limitTo: 5,
    total: 0
  };

  closeResult: string;
  filtersData = {
    routeTo: "contentConsumptionFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["contentType"],
    viewDetailsFilters: false,
    appliedFilters: []
  };

  contentObject = {
    filters: ["contentType"],
    appliedFilters: [],
    responseData: []
  }

  searchFilterData = {
    searchBy: "contentName"
  };

  searchString: string = "";

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

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

  getDataFromService() {
    this.spinner_loader = true;
    this.dashboardService
      .getContentData(this.searchFilterData, this.searchString, this.filtersData.appliedFilters, this.pagination)
      .subscribe((res: any) => {
        this.contentObject.responseData = res.data;

        this.spinner_loader = false;
        this.noDataFlag = this.contentObject.responseData.length == 0 ? true : false;
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
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  downloadPdf() {
    let htmlTemp = document.getElementById("screenToCaputre");
    html2canvas(htmlTemp).then(canvas => {
      // Few necessary setting options  
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('./');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

      pdf.save('MYPdf.pdf'); // Generated PDF   
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
