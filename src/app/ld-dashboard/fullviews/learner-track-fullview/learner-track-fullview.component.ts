import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { CommonService } from "../../../common-services/common.service";

@Component({
  selector: "app-learner-track-fullview",
  templateUrl: "./learner-track-fullview.component.html",
  styleUrls: ["./learner-track-fullview.component.scss"]
})
export class LearnerTrackFullviewComponent implements OnInit {

  responseGraphDetails: any;
  responseTrackDetails = [];
  selectType: string;
  filterbody = {};
  filtersData = {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    viewDetails: false,
    filterList: ["batch"],
    viewDetailsFilters: true
  };
  componentName: string;

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  paceTrackValues = [];
  performanceTrackValues = [];

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0
  };

  constructor(private dashboardService: LdDashboardService) {
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

    // this.componentName = this.myStorage.getItem('learnerTrackCurrentModule');
  }

  getModule() {
    this.componentName = localStorage.getItem('trackComponent');
    if (this.componentName == "pace") {
      this.selectType = "aheadschedule";
      localStorage.setItem('trackDisplayFor', this.selectType);
    }
    else if (this.componentName == "performance") {
      this.selectType = "excelling";
      localStorage.setItem('trackDisplayFor', this.selectType);
    }

    this.getTableDataFromService();
    this.getGraphDataFromService();

  }

  getGraphDataFromService() {
    this.dashboardService
      .getLearnerTrackData(this.filterbody)
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

  getTableDataFromService() {
    this.spinner_loader = true;

    this.dashboardService.getLearnerTrackDetails(this.componentName, this.selectType, this.filterbody, this.pagination)
      .subscribe((response: any) => {
        this.responseTrackDetails = response.data;
        this.pagination.total = response.pagination.total;

        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
      });
  }

  getDisplayObject($event) {
    this.selectType = $event;
    localStorage.setItem('trackDisplayFor', this.selectType);
    this.getTableDataFromService();
  }

  gotoPage($event) {
    window.scrollTo(0, 200);
    this.pagination.page = $event;
    this.getTableDataFromService();
  }

  ngOnInit() {
    this.getModule();
  }
}
