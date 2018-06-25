import { Component, OnInit, OnChanges } from "@angular/core";
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

  componentName: string = "pace";

  displayFor = {};
  getDisplayObject($event) {
    this.displayFor = $event;
    console.log("this.displayFor", this.displayFor);
  }

  paceTrackValues = [];
  performanceTrackValues = [];

  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.getData
      .getLearnerTrackDetails(this.componentName, this.displayFor)
      .subscribe((response: any) => {
        this.responseTrackDetails = response.data;
        console.log(this.responseTrackDetails);
      });
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

  ngOnInit() {
    this.getDataFromService();
  }
}
