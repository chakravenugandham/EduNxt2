import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  constructor(private dashboardService: LdDashboardService) { }

  refreshTime = new Date();
  refreshReportFn() {
    this.refreshTime = new Date();
    this.dashboardService.refreshRepotAPI$.next();
  }

  ngOnInit() { }
}
