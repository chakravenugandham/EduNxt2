import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../common-services/common.service";
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  selectTenantName: string = "MAIT";
  tenantsName = ["MAIT", "MAB", "HDFC", "SMUDE"];
  // userName: string;
  // cookieFound: boolean;
  userName = (this.cookieService.get('userName') == '') ? 'User' : this.cookieService.get('userName');
  cookieFound = (this.cookieService.get('userName') == '') ? false : true;

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
    if (this.cookieService.get('userName') == '') {
      console.log("1");

    }
    console.log("this.cookieService.get('userName')", this.cookieService.get('userName'));

    // this.cookieService.set('userName', "Praveen Kondani");
    // this.userName = (this.cookieService.get('userName') == undefined || null) ? 'User' : this.cookieService.get('userName');
    // this.cookieFound = (this.cookieService.get('userName') == undefined || null) ? false : true;
  }
}
