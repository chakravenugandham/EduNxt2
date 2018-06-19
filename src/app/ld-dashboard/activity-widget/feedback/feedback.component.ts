import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";

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
  learnerSatisfactionChange:number;

  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.feedbackDataElement) {
      this.learnerSatisfactionChange = Math.abs(
        this.feedbackDataElement.learnerSatisfactionChange
      );
    }
  }
}
