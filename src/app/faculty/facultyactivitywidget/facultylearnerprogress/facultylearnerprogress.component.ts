import { Component, OnInit } from "@angular/core";
import * as d3 from "d3v4";

@Component({
  selector: "app-facultylearnerprogress",
  templateUrl: "./facultylearnerprogress.component.html",
  styleUrls: ["./facultylearnerprogress.component.scss"]
})
export class FacultylearnerprogressComponent implements OnInit {
  learnerProgressValues = [];
  graphSize = "smallGraph";

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor() { }

  ngOnInit() {
    this.learnerProgressValues = [
      {
        color: "#F77F6C",
        type: "classA",
        number: 24
      },
      {
        color: "#5584FF",
        type: "classB",
        number: 30
      }
    ];
  }
}
