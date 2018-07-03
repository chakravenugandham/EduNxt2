import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"]
})
export class FeedbackComponent implements OnInit, OnChanges {
  @Input()
  feedbackDataElement: {
    learnerSatisfation: number;
    learnerSatisfationBy: number;
    trainerRating: number;
    trainerRatingBy: number;
    contentRating: number;
    contentRatingBy: number;
  };
  learnerSatisfation: number;
  learnerSatisfationBy: number;
  trainerRatingBy: number;
  contentRatingBy: number;
  faArrowUp = faArrowUp;

  constructor() { }

  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.feedbackDataElement.currentValue) {

      this.learnerSatisfation = Math.round(
        this.feedbackDataElement.learnerSatisfation
      );
      this.learnerSatisfationBy = Math.abs(
        this.feedbackDataElement.learnerSatisfationBy
      );
      this.trainerRatingBy = Math.abs(
        this.feedbackDataElement.trainerRatingBy
      );
      this.contentRatingBy = Math.abs(
        this.feedbackDataElement.contentRatingBy
      );
    }
  }
}
