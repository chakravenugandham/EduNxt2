import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-assignment",
  templateUrl: "./assignment.component.html",
  styleUrls: ["./assignment.component.scss"]
})
export class AssignmentComponent implements OnInit, OnChanges {
  @Input() testData: any;
  dataSet;
  // dataSet = [[0, 0], [20, 100], [40, 600], [60, 1000], [80, 600], [100, 100], [110, 0]];
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.dataSet = this.testData;
  }
}
