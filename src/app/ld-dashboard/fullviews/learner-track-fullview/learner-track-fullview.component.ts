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

  getFilterObject($event) {
    this.filterbody = $event;
    this.getTableDataFromService();
    this.getGraphDataFromService();
  }

  getDisplayObject($event) {
    this.selectType = $event;
    this.getTableDataFromService();
  }

  paceTrackValues = [];
  performanceTrackValues = [];

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0
  };

  constructor(private dashboardService: LdDashboardService, private filterData: CommonService) {
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

  getFilterData() {
    this.componentName = this.filterData.learnerFilterBodyDetails["currentModule"];
  }

  getTableDataFromService() {

    // this.responseTrackDetails = [];
    this.spinner_loader = true;

    if (this.filterData.learnerFilterBodyDetails["currentModule"] == undefined) {
      this.filterData.learnerFilterBodyDetails["currentModule"] = "performance";
    }

    if (this.filterData.learnerFilterBodyDetails["currentModule"] == "pace") {
      this.selectType = "aheadschedule";
      this.dashboardService
        .getLearnerTrackDetails(
          this.filterData.learnerFilterBodyDetails["currentModule"], this.selectType, this.filterbody, this.pagination
        )
        .subscribe((response: any) => {
          this.responseTrackDetails = response.data;
          this.pagination.total = response.pagination.total;

          this.spinner_loader = false;
          this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
        });
    } else if (
      this.filterData.learnerFilterBodyDetails["currentModule"] == "performance"
    ) {
      this.selectType = "excelling";
      this.dashboardService
        .getLearnerTrackDetails(
          this.filterData.learnerFilterBodyDetails["currentModule"], this.selectType, this.filterbody, this.pagination
        )
        .subscribe((response: any) => {
          this.responseTrackDetails = response.data;
          this.pagination.total = response.pagination.total;

          this.spinner_loader = false;
          this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
        });
    }
  }

  gotoPage($event) {
    console.log(this.responseTrackDetails);
    window.scrollTo(0, 200);
    this.pagination.page = $event;
    this.getTableDataFromService();
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
            color: "#ffd630",
            type: "classB",
            number: this.responseGraphDetails.performanceData["passing"]
          },
          {
            color: "#f77f6c",
            type: "classC",
            number: this.responseGraphDetails.performanceData["struggling"]
          }
        ];
      });
  }

  ngOnInit() {
    this.getTableDataFromService();
    this.getGraphDataFromService();
    this.getFilterData();
    this.getDisplayObject(this.selectType);
  }
}
