import { Component, OnInit } from "@angular/core";
import { observable } from "rxjs";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-org-interest-fullview",
  templateUrl: "./org-interest-fullview.component.html",
  styleUrls: ["./org-interest-fullview.component.scss"]
})
export class OrgInterestFullviewComponent implements OnInit {
  //global variable declarations
  responseData = [];

  //dropdown display values
  displayFor = {};

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
    });
  }
  getDisplayObject($event) {
    this.displayFor = $event;
  }

  //api call for orgDetails based on component
  getDataFromService() {
    this.dashboardService.getOrgInterestDetailsData().subscribe((res: any) => {
      this.responseData = res.data;
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
