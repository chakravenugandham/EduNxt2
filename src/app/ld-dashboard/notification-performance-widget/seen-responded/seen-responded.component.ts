import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-seen-responded",
  templateUrl: "./seen-responded.component.html",
  styleUrls: ["./seen-responded.component.scss"]
})
export class SeenRespondedComponent implements OnInit {
  barChartData = [
    { label: "Module1", Group1: 20, Group3: 50 },
    { label: "Module2", Group1: 30, Group3: 70 },
    { label: "Module3", Group1: 20, Group3: 50 },
    { label: "Module4", Group1: 40, Group3: 90 },
    { label: "Module5", Group1: 50, Group3: 60 },
    { label: "Module6", Group1: 60, Group3: 30 }
  ];
  constructor() {}

  ngOnInit() {}
}
