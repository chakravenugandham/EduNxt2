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

  constructor(private getData: LdDashboardService) {}

  getDataFromService() {
    this.getData.getLearnerTrackDetails().subscribe((response: any) => {
      this.responseTrackDetails = response.data;
      console.log(this.responseTrackDetails);
    });
    this.getData.getGraphDetails().subscribe((res: any) => {
      this.responseGraphDetails = res.data;
    });
  }

  LearnersServiceData() {
    this.getData.getLearnerTrackData("pace").subscribe((response: any) => {
      this.widgetData.pace = response.data.paceData;
      this.widgetData.performance = response.data.performanceData;
    });
  }

  ngOnInit() {
    // this.getDataFromService();
    this.LearnersServiceData();
    console.log(this.responseGraphDetails, this.responseTrackDetails);
  }
}
