import { Component, OnInit } from "@angular/core";
declare let d3: any;

@Component({
  selector: "app-scheduled-delivered",
  templateUrl: "./scheduled-delivered.component.html",
  styleUrls: ["./scheduled-delivered.component.scss"]
})
export class ScheduledDeliveredComponent implements OnInit {
  barChartData: any[];
  constructor() { }

  ngOnInit() {
  }
}
