import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-test-scores",
  templateUrl: "./test-scores.component.html",
  styleUrls: ["./test-scores.component.scss"]
})
export class TestScoresComponent implements OnInit {
  @Input() testData: any;
  // dataSet = [[0, 0], [20, 100], [40, 600], [60, 1000], [80, 600], [100, 100], [110, 0]];

  constructor() {}

  ngOnInit() {}
}
