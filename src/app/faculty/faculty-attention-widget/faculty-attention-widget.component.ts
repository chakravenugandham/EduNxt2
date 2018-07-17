import { Component, OnInit, OnChanges } from '@angular/core';
import { FacultyAttentionWidgetCardComponent, Config } from "../common/faculty-attention-widget-card/faculty-attention-widget-card.component";

@Component({
  selector: 'app-faculty-attention-widget',
  templateUrl: './faculty-attention-widget.component.html',
  styleUrls: ['./faculty-attention-widget.component.scss']
})
export class FacultyAttentionWidgetComponent implements OnInit, OnChanges {

  firstData: Config;

  // message = [
  //   {
  //     title: "Mastery Insight",
  //     text:
  //       "NPS score has increased from 6 to 8 after your recent Customer Service Training."
  //   },
  //   {
  //     title: "Mastery Insight",
  //     text:
  //       "People from Sales team are performing better than 75% of their peers"
  //   }
  // ];

  constructor() { }

  // removeWidget(i) {
  //   this.message.splice(i, 1);
  // }

  ngOnChanges(changes: any) {
    if (changes.firstData.currentValue) {
    }

  }

  ngOnInit() {
    this.firstData = {
      attentionName: "Feedback",
      attentionHeading1: "Quiz 6",
      attentionSubHeading1: "This Quiz has recorded a large number of failed attempts.",
      attentionNumber1: 56,
      attentionNumber1Text: "Students attempted this Quiz",
      attentionNumber2: 2667,
      attentionNumber2Text: "Failed Attempts (Including reattempts)",
      attentionNumber3: "65%",
      attentionNumber3Text: "More failures vs other quizzes in this course"
    }

  }

}
