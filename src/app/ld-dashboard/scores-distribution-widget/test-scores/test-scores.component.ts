import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-test-scores",
  templateUrl: "./test-scores.component.html",
  styleUrls: ["./test-scores.component.scss"]
})
export class TestScoresComponent implements OnInit {
  @Input() testData: any;
  constructor() { }

  ngOnInit() { }
}
