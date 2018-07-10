import { Component, OnInit } from "@angular/core";
import { observable } from "rxjs";

import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-ld-dashboard-widget",
  templateUrl: "./ld-dashboard-widget.component.html",
  styleUrls: ["./ld-dashboard-widget.component.scss"]
})
export class LdDashboardWidgetComponent implements OnInit {

  constructor(private getData: LdDashboardService) { }

  ngOnInit() { }
}
