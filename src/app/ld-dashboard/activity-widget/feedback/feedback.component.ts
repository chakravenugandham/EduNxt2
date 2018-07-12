import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"]
})
export class FeedbackComponent implements OnInit, OnChanges {
  //@Input() feedbackDataElement;

  learnerSatisfaction: any;
  learnerSatisfationBy: number;
  trainerRating: any;
  trainerRatingBy: number;
  contentRating: any;
  contentRatingBy: number;
  parseFloat = parseFloat;
  faArrowUp = faArrowUp;

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
    this.dashboardService.getFeedbackWidgetData().subscribe((response: any) => {
      this.responseData = response.data;
      this.spinner_loader = false;
      this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;

      this.learnerSatisfaction = Number(
        this.responseData["learnerSatisfaction"]
      ).toFixed(1);

      this.trainerRating = Number(this.responseData["trainerRating"]).toFixed(
        1
      );
      this.contentRating = Number(this.responseData["contentRating"]).toFixed(
        2
      );

      this.learnerSatisfationBy = Math.abs(
        Math.round(this.responseData["learnerSatisfationBy"])
      );
      this.trainerRatingBy = Math.abs(this.responseData["trainerRatingBy"]);
      this.contentRatingBy = Math.abs(
        Math.round(this.responseData["contentRatingBy"])
      );
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.feedbackDataElement.currentValue) {
    // }
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
