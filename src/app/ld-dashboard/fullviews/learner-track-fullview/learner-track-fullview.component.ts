import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { NgbModal, ModalDismissReasons, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

import { _ } from "underscore";

@Component({
  selector: "app-learner-track-fullview",
  templateUrl: "./learner-track-fullview.component.html",
  styleUrls: ["./learner-track-fullview.component.scss"]
})
export class LearnerTrackFullviewComponent implements OnInit {

  responseGraphDetails: any;
  responseTrackDetails = [];
  displayfor: string;
  filterbody = {};
  closeResult: string;
  filtersData = {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    viewDetails: false,
    viewDetailsFilters: true,
    filterList: ["batch"],
    currentModule: '',
    appliedFilters: []
  };
  order: string = 'asc';

  searchBox: boolean = false;
  componentName: string;

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  paceTrackValues = [];
  performanceTrackValues = [];

  sortOrder: string = 'learnerName';


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
    text: "Hi"
  };

  constructor(private dashboardService: LdDashboardService, private modalService: NgbModal) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getGraphDataFromService();
      this.getTableDataFromService(this.sortOrder);
    });
    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getGraphDataFromService();
      this.getTableDataFromService(this.sortOrder);
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getGraphDataFromService();
      this.getTableDataFromService(this.sortOrder);
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getGraphDataFromService();
      this.getTableDataFromService(this.sortOrder);
    });

    // this.filtersData.currentModule = this.myStorage.getItem('learnerTrackCurrentModule');
  }

  getModule() {
    this.filtersData.currentModule = localStorage.getItem('trackComponent');
    if (this.filtersData.currentModule == "pace") {
      this.displayfor = "aheadschedule";
      localStorage.setItem('trackDisplayFor', this.displayfor);
      this.getTableDataFromService(this.sortOrder);
      this.getGraphDataFromService();
    }
    else if (this.filtersData.currentModule == "performance") {
      this.displayfor = "excelling";
      localStorage.setItem('trackDisplayFor', this.displayfor);
      this.getTableDataFromService(this.sortOrder);
      this.getGraphDataFromService();
    }
  }

  getGraphDataFromService() {
    this.dashboardService
      .getLearnerTrackData(this.filtersData.appliedFilters)
      .subscribe((res: any) => {
        this.responseGraphDetails = res.data;
        this.paceTrackValues = [
          {
            color: "#23b14d",
            type: "classA",
            number: this.responseGraphDetails.paceData["aheadSchedule"]
          },
          {
            color: "#ffd630",
            type: "classB",
            number: this.responseGraphDetails.paceData["behindSchedule"]
          },
          {
            color: "#f77f6c",
            type: "classC",
            number: this.responseGraphDetails.paceData["haveNotStarted"]
          },
          {
            color: "#5584ff",
            type: "classD",
            number: this.responseGraphDetails.paceData["onTrack"]
          }
        ];
        this.performanceTrackValues = [
          {
            color: "#23b14d",
            type: "classA",
            number: this.responseGraphDetails.performanceData["excelling"]
          },
          {
            color: "#5584ff",
            type: "classB",
            number: this.responseGraphDetails.performanceData["passing"]
          },
          {
            color: "#f77f6c",
            type: "classC",
            number: this.responseGraphDetails.performanceData["haveNotStarted"]
          },
          {
            color: "#ffd630",
            type: "classD",
            number: this.responseGraphDetails.performanceData["struggling"]
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
    this.getTableDataFromService(sortByName);
  }


  getTableDataFromService(sortbyname) {
    // if (!this.displayfor) {
    //   return;
    // }
    this.spinner_loader = true;
    this.responseTrackDetails = [];
    window.scrollTo(0, 0);
    this.dashboardService.getLearnerTrackDetails(this.filtersData.currentModule, this.displayfor, this.searchFilterData, this.searchString, this.filtersData.appliedFilters, this.pagination, sortbyname, this.order)
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
    this.getTableDataFromService(this.sortOrder);
  }

  gotoPage($event) {
    this.pagination.page = $event;
    this.getTableDataFromService(this.sortOrder);
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
    this.getTableDataFromService(this.sortOrder);
    this.getGraphDataFromService();
  }

  ngOnInit() {
    this.getModule();
    //this.sortByFn(this.sortOrder);
  }
}
