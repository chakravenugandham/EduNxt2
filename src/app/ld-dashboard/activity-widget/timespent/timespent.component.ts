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
  @Input() timeData;
  percentageChange: number;
  expectedChange: boolean;

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
    this.getDataService.getTimeSpentWidgetData().subscribe((response: any) => {
      this.responseData = response.data;
      this.percentageChange = Math.ceil((this.responseData['courseDuration'] * 100) / this.responseData['durationSpent']);
      this.expectedChange = this.percentageChange < this.responseData['expectedTimeSpent'] ? false : true;
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
