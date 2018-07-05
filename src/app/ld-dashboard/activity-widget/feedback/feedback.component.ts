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

  learnerSatisfaction: number;
  learnerSatisfationBy: number;
  trainerRating: number;
  trainerRatingBy: number;
  contentRating: number;
  contentRatingBy: number;
  parseFloat = parseFloat;
  faArrowUp = faArrowUp;

  responseData = {};
  spinner_loader: boolean = false;

  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.getData.dateChange.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.getData.getFeedbackWidgetData().subscribe((response: any) => {
      this.responseData = response.data;
      this.spinner_loader = false;
      console.log("responseData", this.responseData);

      this.learnerSatisfaction = Math.round(
        this.responseData["learnerSatisfaction"]
      );
      this.trainerRating = Math.round(this.responseData["trainerRating"]);
      this.contentRating = Math.round(this.responseData["contentRating"]);
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
