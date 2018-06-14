import { Component, OnInit } from "@angular/core";
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

  widgetData = {
    pace: "",
    performance: ""
  };
  filterbody = {}

  paceTrackValues = [];

  constructor(private getData: LdDashboardService) { }

  getDataFromService() {
    this.getData.getLearnerTrackDetails().subscribe((response: any) => {
      this.responseTrackDetails = response.data;
      console.log(this.responseTrackDetails);
    });
    this.getData.getGraphDetails().subscribe((res: any) => {
      this.responseGraphDetails = res.data;
      console.log(this.responseGraphDetails);
    });
  }

  LearnersServiceData() {
    this.getData.getLearnerTrackData("pace", this.filterbody).subscribe((response: any) => {
      this.widgetData.pace = response.data.paceData;
      this.widgetData.performance = response.data.performanceData;
      console.log(this.widgetData.pace);
    });
  }

  ngOnChanges(changes: any) {
    if (changes.paceData.currentValue) {
      this.paceTrackValues = [
        {
          color: "#F77F6C",
          type: "classA",
          number: this.widgetData.pace['aheadOfSchedule']
        },
        {
          color: "#5584FF",
          type: "classB",
          number: this.widgetData.pace['behindSchedule']
        },
        {
          color: "#23B14D",
          type: "classC",
          number: this.widgetData.pace['haveNotStarted']
        },
        {
          color: "#FFD630",
          type: "classD",
          number: this.widgetData.pace['onTrack']
        }
      ];
    }
  }

  ngOnInit() {
    this.getDataFromService();
    this.LearnersServiceData();
    console.log(this.responseGraphDetails, this.responseTrackDetails);
  }
}
