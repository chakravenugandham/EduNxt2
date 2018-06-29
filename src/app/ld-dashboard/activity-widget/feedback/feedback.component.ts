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
    learnerSatisfaction: number;
    learnerSatisfactionChange: number;
    trainerRating: number;
    trainerRatingChange: number;
    contentRating: number;
    contentRatingChange: number;
  };
  learnerSatisfaction: number;
  learnerSatisfactionChange: number;
  trainerRatingChange: number;
  contentRatingChange: number;
  faArrowUp = faArrowUp;

  constructor() { }

  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.feedbackDataElement.currentValue) {

      this.learnerSatisfaction = Math.round(
        this.feedbackDataElement.learnerSatisfaction
      );
      this.learnerSatisfactionChange = Math.abs(
        this.feedbackDataElement.learnerSatisfactionChange
      );
      this.trainerRatingChange = Math.abs(
        this.feedbackDataElement.trainerRatingChange
      );
      this.contentRatingChange = Math.abs(
        this.feedbackDataElement.contentRatingChange
      );
    }
  }
}
