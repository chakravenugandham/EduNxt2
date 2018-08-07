import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../../common-services/common.service";
import { LdDashboardService } from "../../services/ld-dashboard.service";

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  selectTenantName: string = "MAIT";

  tenantsName = ["MAIT", "MAB", "HDFC", "SMUDE"];


  userName: string = this.cookieService.get('userName');

  constructor(
    private getTenantName: CommonService,
    private dashboardService: LdDashboardService,
    private cookieService: CookieService
  ) { }

  changeCourse(selectTenantName) {
    this.dashboardService.selectTenantName(selectTenantName);
  }

  logout() {
    this.dashboardService.logout().subscribe(res => console.log(res));
  }

  ngOnInit() {
    this.cookieService.set('userName', "Praveen Kondani");
  }
}
