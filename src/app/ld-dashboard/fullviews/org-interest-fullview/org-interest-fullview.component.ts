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

  constructor(private getData: LdDashboardService) { }
  getDisplayObject($event) {
    this.displayFor = $event;
  }

  //api call for orgDetails based on component
  getDataFromService() {
    this.getData.getOrgInterestData().subscribe((res: any) => {
      this.responseData = res.data;
    })
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
