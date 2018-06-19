import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-attention-need-widget",
  templateUrl: "./attention-need-widget.component.html",
  styleUrls: ["./attention-need-widget.component.scss"]
})
export class AttentionNeedWidgetComponent implements OnInit {
  message = [
    {
      title: "Mastery Insight",
      text:
        "NPS score has increased from 6 to 8 after your recent Customer Service Training."
    },
    {
      title: "Mastery Insight",
      text:
        "People from Sales team are performing better than 75% of their peers"
    },
    {
      title: "Mastery Insight",
      text:
        "80% of people are struggling on Communication Design quiz module in Communication 101"
    }
  ];

  constructor() {}

  removeWidget(i) {
    this.message.splice(i, 1);
  }

  ngOnInit() {}
}
