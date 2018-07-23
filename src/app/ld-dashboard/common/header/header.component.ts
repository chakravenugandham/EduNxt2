import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../../common-services/common.service";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  selectTenantName: string = "MAIT";

  tenantsName = ["MAIT", "MAB", "HDFC"];

  constructor(
    private getTenantName: CommonService,
    private dashboardService: LdDashboardService
  ) {}

  changeCourse(selectTenantName) {
    this.dashboardService.selectTenantName(selectTenantName);
  }

  ngOnInit() {}
}
