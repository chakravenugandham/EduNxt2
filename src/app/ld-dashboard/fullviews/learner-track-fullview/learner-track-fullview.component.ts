import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { Observable } from "rxjs";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-learner-track-fullview",
  templateUrl: "./learner-track-fullview.component.html",
  styleUrls: ["./learner-track-fullview.component.scss"]
})
export class LearnerTrackFullviewComponent implements OnInit {
  responseTrackDetails: any;
  responseGraphDetails: any;

  selectType: string = "Ahead of Schedule";

  filterbody = {};
  componentName = {};

  getDisplayObject($event) {
    this.filterbody = $event;
    console.log("this.displayFor", this.filterbody);
    this.getTableDataFromService();
  }

  paceTrackValues = [];
  performanceTrackValues = [];

  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getGraphDataFromService();
    });
  }

  getFilterData() {
    this.getData.getLearnerFilterBodyDetails(this.componentName);
    console.log(this.componentName);
  }

  getTableDataFromService() {
    this.getData
      .getLearnerTrackDetails(this.componentName, this.filterbody)
      .subscribe((response: any) => {
        this.responseTrackDetails = response.data;
        console.log(this.filterbody);
      });
  }

  getGraphDataFromService() {
    this.getData.getGraphDetails().subscribe((res: any) => {
      this.responseGraphDetails = res.data;
      console.log(this.responseGraphDetails);
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

  // ngOnChanges(changes: any) {
  //   if (changes.componentName.currentValue) {
  //     this.getFilterData();
  //   }
  // }

  ngOnInit() {
    this.getTableDataFromService();
    this.getGraphDataFromService();

  }
}
