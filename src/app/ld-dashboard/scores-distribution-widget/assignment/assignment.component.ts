import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-assignment",
  templateUrl: "./assignment.component.html",
  styleUrls: ["./assignment.component.scss"]
})
export class AssignmentComponent implements OnInit {
  @Input() testData: any;

  constructor() { }

  ngOnInit() { }
}
