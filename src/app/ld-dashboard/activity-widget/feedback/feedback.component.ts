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
  @Input() feedbackDataElement;

  learnerSatisfation: number;
  learnerSatisfationBy: number;
  trainerRatingBy: number;
  contentRatingBy: number;
  parseFloat = parseFloat;
  faArrowUp = faArrowUp;

  responseData = {};

  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.getData.dateChange.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.getData.getFeedbackWidgetData().subscribe((response: any) => {
      this.responseData = response.data;
      this.learnerSatisfation = Math.round(
        this.responseData["learnerSatisfation"]
      );
      this.learnerSatisfationBy = Math.abs(
        this.responseData["learnerSatisfationBy"]
      );
      this.trainerRatingBy = Math.abs(this.responseData["trainerRatingBy"]);
      this.contentRatingBy = Math.abs(this.responseData["contentRatingBy"]);
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
