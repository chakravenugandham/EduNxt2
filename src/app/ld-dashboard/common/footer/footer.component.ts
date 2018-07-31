import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  constructor(private dashboardService: LdDashboardService) {}

  refreshTime = new Date();
  refreshReportFn() {
    this.refreshTime = new Date();
    console.log("this.refreshTime", this.refreshTime);

    this.dashboardService.refreshRepotAPI$.next();
  }

  ngOnInit() {}
}
