import { Component, OnInit, Inject } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';

import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {

  timeStamp: any;
  myStorage = window.localStorage;
  orgPerformanceComponentName: string;
  learnerTrackComponentName: string;
  learnerDisplayFor: string;
  scoreComponent: string;
  _baseUrl;

  csvDownloadflag: boolean = false;
  refreshTime: Date;

  constructor(@Inject(LdDashboardService) private dashboardService: LdDashboardService, @Inject(Router) private router: Router, private commonService: CommonService) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._baseUrl = event.url.replace(/\//g, '');
        this.csvDownloadflag = (this._baseUrl === '' || this._baseUrl === 'LnD') ? false : true;
        if (this.csvDownloadflag) {
          this.refreshTimeStamp();
        }
        else if (!this.csvDownloadflag) {
          this.refreshTime = new Date();
        }
      }
    });

  }

  refreshReportFn() {
    this.refreshTime = new Date();
    this.dashboardService.refreshRepotAPI$.next();
  }

  refreshTimeStamp() {
    if (this._baseUrl == "contentConsumptionFullView") {
      let val = 'contentconsumption';
      this.dashboardService.getRefreshTimeStamp(val).subscribe((res: any) => {
        this.refreshTime = res.data.reportGeneratedTime;
      });
    }

    else if (this._baseUrl == "learnerTrackFullView") {
      this.learnerTrackComponentName = this.myStorage.getItem('trackComponent');
      if (this.learnerTrackComponentName === 'pace') {
        let val = 'pace';
        this.dashboardService.getRefreshTimeStamp(val).subscribe((res: any) => {
          this.refreshTime = res.data.reportGeneratedTime;
        });
      }
      else if (this.learnerTrackComponentName === 'performance') {
        let val = 'performance';
        this.dashboardService.getRefreshTimeStamp(val).subscribe((res: any) => {
          this.refreshTime = res.data.reportGeneratedTime;
        });
      }

    }

    else if (this._baseUrl == "scoreDistributionFullView") {
      let val = 'scores';
      this.dashboardService.getRefreshTimeStamp(val).subscribe((res: any) => {
        this.refreshTime = res.data.reportGeneratedTime;
      });
    }

    else if (this._baseUrl == "orgPerformanceFullView") {
      this.orgPerformanceComponentName = this.myStorage.getItem('orgPerformaModule');
      if (this.orgPerformanceComponentName === 'teams') {
        let val = 'teams';
        this.dashboardService.getRefreshTimeStamp(val).subscribe((res: any) => {
          this.refreshTime = res.data.reportGeneratedTime;
        });
      }
      else if (this.orgPerformanceComponentName === 'trainers') {
        let val = 'trainers';
        this.dashboardService.getRefreshTimeStamp(val).subscribe((res: any) => {
          this.refreshTime = res.data.reportGeneratedTime;
        });
      }
      else if (this.orgPerformanceComponentName === 'learners') {
        let val = 'learners';
        this.dashboardService.getRefreshTimeStamp(val).subscribe((res: any) => {
          this.refreshTime = res.data.reportGeneratedTime;
        });
      }
    }

    else if (this._baseUrl == "orgInterestFullView") {
      let val = 'organizationinterests';
      this.dashboardService.getRefreshTimeStamp(val).subscribe((res: any) => {
        this.refreshTime = res.data.reportGeneratedTime;
      });
    }
  }

  ngOnInit() {
    this.commonService.routeChanged.subscribe((route: string) => {
      console.log(route);
    })
  }
}
