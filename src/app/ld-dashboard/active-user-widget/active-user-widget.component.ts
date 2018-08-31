import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: "app-active-user-widget",
  templateUrl: "./active-user-widget.component.html",
  styleUrls: ["./active-user-widget.component.scss"]
})
export class ActiveUserWidgetComponent implements OnInit {
  getTab = "activeUser";
  constructor(private dashboardService: LdDashboardService, private modalService: NgbModal) { }

  tooltipText = 'Active users data';
  closeResult: string;
  //fliter object for payload

  filtersData = {
    routeTo: "",
    filters: false,
    search: false,
    viewDetails: false,
    filterList: ["location"],
    currentModule: "",
    viewDetailsFilters: false
  };

  activeUser: boolean = true;
  modeDelivery: boolean = false;

  filterbody = {};

  activeUsersFn() {
    this.getTab = "activeUser";
    this.tooltipText = 'Active users data';
  }

  modeDeliveryFn() {
    this.getTab = "modeDelivery";
    this.tooltipText = 'View Online vs Offline delivery over the last 30 days';
  }

  locationFn() {
    this.getTab = "location";
    this.tooltipText = 'Activity by Location';
  }

  getFilterObject($event) {
    this.filterbody = $event;
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
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

  ngOnInit() {
    this.tooltipText = 'Active users data';
  }

}
