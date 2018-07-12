import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { Observable } from "rxjs";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { CommonService } from "../../../common-services/common.service";

@Component({
  selector: "app-learner-track-fullview",
  templateUrl: "./learner-track-fullview.component.html",
  styleUrls: ["./learner-track-fullview.component.scss"]
})
export class LearnerTrackFullviewComponent implements OnInit {
  responseTrackDetails: any;
  responseGraphDetails: any;
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

  constructor(
    private getData: LdDashboardService,
    private filterData: CommonService
  ) {
    this.getData.refreshAPI.subscribe(result => {
      this.getGraphDataFromService();
      this.getTableDataFromService();
    });
    this.getData.dateChangeAPI.subscribe(result => {
      this.getGraphDataFromService();
      this.getTableDataFromService();
    });
  }

  getFilterData() {
    this.filterData.learnerFilterBodyDetails;
    this.componentName = this.filterData.learnerFilterBodyDetails[
      "currentModule"
    ];
  }

  getTableDataFromService() {
    if (this.filterData.learnerFilterBodyDetails['currentModule'] == 'pace') {
      this.selectType = "paceaheadschedule";
      this.getData
        .getLearnerTrackDetails(this.filterData.learnerFilterBodyDetails['currentModule'], this.selectType, this.filterbody)
        .subscribe((response: any) => {
          this.responseTrackDetails = response.data;
        });
    }
    if (this.filterData.learnerFilterBodyDetails['currentModule'] == 'performance') {
      this.selectType = "excelling";
      this.getData
        .getLearnerTrackDetails(this.filterData.learnerFilterBodyDetails['currentModule'], this.selectType, this.filterbody)
        .subscribe((response: any) => {
          this.responseTrackDetails = response.data;
        });
    }
  }

  getGraphDataFromService() {
    this.getData.getLearnerTrackData(this.filterbody).subscribe((res: any) => {
      this.responseGraphDetails = res.data;
      this.paceTrackValues = [
        {
          color: "#23b14d",
          type: "classA",
          number: this.responseGraphDetails.paceData["aheadOfSchedule"]
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
          type: "classD",
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
