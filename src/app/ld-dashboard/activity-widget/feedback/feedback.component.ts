import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @Input() feedbackDataElement: {learnerSatisfaction: number, learnerSatisfactionChange: number, trainerRating: number, trainerRatingChange: number, contentRating: number, contentRatingChange:number};

  constructor() { }

  ngOnInit() {
  }

}
