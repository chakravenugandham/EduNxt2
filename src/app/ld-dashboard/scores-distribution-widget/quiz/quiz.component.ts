import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.scss"]
})
export class QuizComponent implements OnInit {
  @Input() testData: any;

  constructor() { }

  ngOnInit() { }
}
