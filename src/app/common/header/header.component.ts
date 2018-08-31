import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../common-services/common.service";
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";

import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  selectTenantName: string = "MAIT";
  tenantsName = ["MAIT", "MAB", "HDFC", "SMUDE", "PROLEARN"];

  userName = (this.cookieService.get('user_name') == '') ? 'User' : this.cookieService.get('user_name');
  tenantName = (this.cookieService.get('tenantName') == '') ? 'MAIT' : this.cookieService.get('tenantName');
  redirectUrl = (this.cookieService.get('redirectUrl') == '') ? '/' : this.cookieService.get('redirectUrl');
  user_id = (this.cookieService.get('user_id') == '') ? '0' : this.cookieService.get('user_id');
  cookieFound = (this.cookieService.get('user_name') == '') ? false : true;

  // userName = this.cookieService.get('user_name');
  // cookieFound = true;

  constructor(
    private dashboardService: LdDashboardService,
    private cookieService: CookieService,
    private router: Router
  ) {

  }

  changeCourse(selectTenantName) {
    //this.dashboardService.selectTenantName(selectTenantName);
  }

  logout() {
    //this.dashboardService.logout().subscribe(res => console.log(res));
    //this.router.navigate();
    localStorage.removeItem('t');
    window.location.href = this.redirectUrl;
  }

  ngOnInit() {
    //this.cookieService.set('user_name', "Praveen Kondani");
    this.dashboardService.selectTenantNameV2(this.tenantName, this.user_id);
  }
}
