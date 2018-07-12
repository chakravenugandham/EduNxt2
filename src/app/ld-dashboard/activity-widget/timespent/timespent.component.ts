import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";

import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-timespent",
  templateUrl: "./timespent.component.html",
  styleUrls: ["./timespent.component.scss"]
})
export class TimespentComponent implements OnInit, OnChanges {
  // @Input() timeData;
  percentageChange: number;
  // expectedChange: boolean;

  responseData = {};
  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.dashboardService
      .getTimeSpentWidgetData()
      .subscribe((response: any) => {
        this.responseData = response.data;
        this.spinner_loader = false;
        this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
        // this.percentageChange = Math.ceil(
        //   (this.responseData["courseDuration"] * 100) /
        //   this.responseData["durationSpent"]
        // );
        // this.expectedChange =
        //   this.percentageChange < this.responseData["expectedTimeSpent"]
        //     ? false
        //     : true;
      });
  }

  ngOnInit() {
    this.getDataFromService();
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.timeData.currentValue) {
    // }
  }
}
