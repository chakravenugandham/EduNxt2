import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges
} from "@angular/core";
import * as d3 from "d3";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-userstrained",
  templateUrl: "./userstrained.component.html",
  styleUrls: ["./userstrained.component.scss"]
})
export class UserstrainedComponent implements OnInit, OnChanges {
  @Input() usersData;
  percentageChange: number;
  responseData = {};
  constructor(private getDataService: LdDashboardService) {
    this.getDataService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
    this.getDataService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.getDataService
      .getUsersTrainedWidgetData()
      .subscribe((response: any) => {
        this.responseData = response.data;
        this.percentageChange = Math.floor(
          (this.responseData["completedTraining"] * 100) /
            this.responseData["totalLearners"]
        );
      });
  }

  ngOnChanges(changes: any) {}

  ngOnInit() {
    this.getDataFromService();
  }
}
