import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from '../../services/ld-dashboard.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { _ } from 'underscore';


@Component({
  selector: 'app-org-performance-fullview',
  templateUrl: './org-performance-fullview.component.html',
  styleUrls: ['./org-performance-fullview.component.scss']
})
export class OrgPerformanceFullviewComponent implements OnInit {

  responseData: any[];
  closeResult: string;

  sortOrder: string;
  order = 'desc';

  showDetails: string;
  componentName: string;
  compareUsers = [];

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0,
    total_pages: 0
  };

  searchFilterData = {
    searchComponent: 'learner-leaderboard',
    searchBy: 'avgTestPerformance'
  };

  searchString = '';

  emailData = {
    to: '',
    subject: 'Performance Review',
    text: ''
  };
  parseFloat = parseFloat;
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

  sortByFn(sortByName) {
    if (this.sortOrder === sortByName) {
      if (this.order === 'asc') {
        this.order = 'desc';
      } else if (this.order === 'desc') {
        this.order = 'asc';
      }
    } else {
      this.order = 'asc';
    }
    this.sortOrder = sortByName;
    this.getDataFromService();
  }

  // api calls for trainers ,teams and learner
  getDataFromService() {
    this.spinner_loader = true;
    this.responseData = [];
    this.dashboardService.getPerformanceDetails(this.searchFilterData, this.searchString, this.pagination, this.sortOrder, this.order).subscribe((response: any) => {
      this.responseData = response.data;
      this.pagination.total = response.pagination.total;
      this.pagination.total_pages = response.pagination.total_pages;
      this.spinner_loader = false;
      this.noDataFlag = response.data.length === 0 ? true : false;
    });

  }

  setConfigObj() {
    if (this.componentName === 'teams') {
      this.searchFilterData.searchComponent = 'team-leaderboard';
      this.searchFilterData.searchBy = 'teamName';
      this.sortOrder = 'teamName';
    }
    if (this.componentName === 'trainers') {
      this.searchFilterData.searchComponent = 'trainer-leaderboard';
      this.searchFilterData.searchBy = 'trainerName';
      this.sortOrder = 'trainerName';
    }
    if (this.componentName === 'learners') {
      this.searchFilterData.searchComponent = 'learner-leaderboard';
      this.searchFilterData.searchBy = 'learnerName';
      this.sortOrder = 'avgTestPerformance';
    }
  }

  gotoPage($event) {
    window.scrollTo(0, 0);
    this.pagination.page = $event;
    this.getDataFromService();
  }

  searchItem() {
    this.pagination.page = 1;
    this.getDataFromService();
  }

  selectToCompare(user) {
    if (_.findIndex(this.compareUsers, user) === -1) {
      this.compareUsers.push(user);
    } else {
      this.compareUsers.splice(_.findIndex(this.compareUsers, user), 1);
    }
  }

  clearSelected() {
    this.compareUsers = [];
    this.pagination.page = 1;
    this.getDataFromService();
  }

  checkItemInApplied(item) {
    const itemFound = (_.findIndex(this.compareUsers, item) === -1) ? false : true;
    return itemFound;
  }

  compareSelected() {
    this.responseData = this.compareUsers;
  }

  changeData(name) {
    this.componentName = name;
    this.dashboardService.changeLeaderBoard(name);
    localStorage.setItem('orgPerformaModule', name);
    this.pagination.page = 1;
    this.compareUsers = [];
    this.searchString = '';
    this.setConfigObj();
    this.getDataFromService();
  }

  open(content, type, personId) {
    this.dashboardService.getEmailAddress(personId).subscribe((response: any) => {
      this.emailData.to = response.data.email;
      if (type === 'followup') {
        this.emailData.text = 'This mail is regarding the Follow up. Please have a look at your Performance';
      } else if (type === 'congrats') {
        this.emailData.text = 'Congratulations..! You did a great job on your performance. Keep going.';
      }

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

    });
  }

  composeEmail(type, personId) {
    this.dashboardService.getEmailAddress(personId).subscribe((response: any) => {
      this.emailData.to = response.data.email;

      if (type === 'followup') {
        this.emailData.text = 'This mail is regarding the Follow up. Please have a look at your Performance';
      } else if (type === 'congrats') {
        this.emailData.text = 'Congratulations..! You did a great job on your performance. Keep going.';
      }

      window.open('mailto:' + this.emailData.to + '?subject=' + this.emailData.subject + '&body=' + this.emailData.text, '_self');
    });
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
  ngOnInit() {
    window.scrollTo(0, 0);
    this.componentName = this.showDetails = localStorage.getItem('orgPerformaModule');
    this.setConfigObj();
    this.getDataFromService();
  }
}
