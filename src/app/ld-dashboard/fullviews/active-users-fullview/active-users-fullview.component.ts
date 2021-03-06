import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { NgbModal, ModalDismissReasons, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

import { _ } from "underscore";

@Component({
  selector: "app-active-users-fullview",
  templateUrl: "./active-users-fullview.component.html",
  styleUrls: ["./active-users-fullview.component.scss"]
})
export class ActiveUserFullviewComponent implements OnInit {

  responseGraphDetails: any;
  responseTrackDetails = [];
  activeUser = 0;
  displayfor: string;
  filterbody = {};
  closeResult: string;
  filtersData = {
    routeTo: "activeUsersFullView",
    filters: true,
    search: false,
    viewDetails: false,
    viewDetailsFilters: true,
    filterList: ["batch"],
    currentModule: '',
    appliedFilters: []
  };

  spinner_loader: boolean = false;
  spinner_loader_graph: boolean = false;
  noDataFlag: boolean = false;

  paceTrackValues = [];
  performanceTrackValues = [];

  sortOrder: string;
  order: string = 'desc';


  searchFilterData = {
    searchBy: "learnerName"
  };
  searchString: string = "";

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0,
    total_pages: 0
  };

  emailData = {
    to: "",
    subject: "manipal user",
    text: ""
  };

  constructor(private dashboardService: LdDashboardService, private modalService: NgbModal) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getGraphDataFromService();
      this.getTableDataFromService();
    });
    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getGraphDataFromService();
      this.getTableDataFromService();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getGraphDataFromService();
      this.getTableDataFromService();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getGraphDataFromService();
      this.getTableDataFromService();
    });
  }

  getModule() {
    this.filtersData.currentModule = localStorage.getItem('trackComponent');
    this.displayfor = "aheadschedule";
    this.sortOrder = 'lastlogin';
    localStorage.setItem('trackDisplayFor', this.displayfor);
    this.getTableDataFromService();
    this.getGraphDataFromService();
  }

  getGraphDataFromService() {
    this.spinner_loader_graph = true;
    this.dashboardService.getActiveUserSourceDetails(this.filtersData.appliedFilters).subscribe((res: any) => {
      this.responseGraphDetails = res.data;
      this.spinner_loader_graph = false;
      this.paceTrackValues = [
        {
          color: "#23b14d",
          type: "classA",
          number: this.responseGraphDetails.sourceTimeSpentData["android"]
        },
        {
          color: "#ffd630",
          type: "classB",
          number: this.responseGraphDetails.sourceTimeSpentData["web"]
        },
        {
          color: "#f77f6c",
          type: "classC",
          source: "activeUser",
          number: this.responseGraphDetails.sourceTimeSpentData["pwa"]
        },
        {
          color: "#5584ff",
          type: "classD",
          number: this.responseGraphDetails.sourceTimeSpentData["ios"]
        }
      ];
      this.performanceTrackValues = [
        {
          color: "#23b14d",
          type: "classA",
          number: this.responseGraphDetails.sourceLoginData["android"]
        },
        {
          color: "#5584ff",
          type: "classB",
          number: this.responseGraphDetails.sourceLoginData["ios"]
        },
        {
          color: "#f77f6c",
          type: "classC",
          source: "activeUser",
          number: this.responseGraphDetails.sourceLoginData["pwa"]
        },
        {
          color: "#ffd630",
          type: "classD",
          number: this.responseGraphDetails.sourceLoginData["web"]
        }
      ];
    });
  }

  sortByFn(sortByName) {
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
    this.sortOrder = sortByName;
    this.getTableDataFromService();
  }


  getTableDataFromService() {
    this.spinner_loader = true;
    this.responseTrackDetails = [];
    this.dashboardService.getActiveUserDetails(this.filtersData.currentModule, this.displayfor, this.searchFilterData, this.searchString, this.filtersData.appliedFilters, this.pagination, this.sortOrder, this.order)
      .subscribe((response: any) => {
        this.responseTrackDetails = response.data;

        this.pagination.total = response.pagination.total;
        this.pagination.total_pages = response.pagination.total_pages;

        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
      });
  }

  checkObjEmpty(obj) {
    if (_.isEmpty(obj)) {
      return false;
    } 
    else {
      return true;
    }
  }

  getDisplayObject($event) {
    this.displayfor = $event;
    localStorage.setItem('trackDisplayFor', this.displayfor);
    this.pagination.page = 1;
    this.searchString = "";
    this.getTableDataFromService();
  }

  activeUsers(){
    return this.pagination.total;
  }

  gotoPage($event) {
    window.scrollTo(0, 0);
    this.pagination.page = $event;
    this.getTableDataFromService();
  }

  open(content, type, personId) {
    this.dashboardService.getEmailAddress(personId).subscribe((response: any) => {
      this.emailData.to = response.data.email;
      if (type == "followup")
        this.emailData.text = "This mail is regarding the Follow up. Please have a look at your Performance";
      else if (type == "congrats")
        this.emailData.text = "Congratulations..! You did a great job on your performance. Keep going.";

      this.modalService.open(content).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.dashboardService.emailReportService(this.emailData).subscribe((response: any) => {
          });
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

    })
  }

  composeEmail(type, personId) {
    this.dashboardService.getEmailAddress(personId).subscribe((response: any) => {
      this.emailData.to = response.data.email;

      if (type == "followup")
        this.emailData.text = "This mail is regarding the Follow up. Please have a look at your Performance";
      else if (type == "congrats")
        this.emailData.text = "Congratulations..! You did a great job on your performance. Keep going.";

      window.open("mailto:" + this.emailData.to + "?subject=" + this.emailData.subject + "&body=" + this.emailData.text, "_self");
    })
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

  addFilters($event) {
    this.filtersData.appliedFilters = $event;
    this.getTableDataFromService();
    this.getGraphDataFromService();
  }

  searchItem() {
    this.pagination.page = 1;
    this.getTableDataFromService();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getModule();
  }
}
