import { Component, OnInit } from "@angular/core";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-active-user-widget",
  templateUrl: "./active-user-widget.component.html",
  styleUrls: ["./active-user-widget.component.scss"]
})
export class ActiveUserWidgetComponent implements OnInit {
  constructor(private getData: LdDashboardService) { }

  activeUser: boolean = true;
  modeDelivery: boolean = false;

  activeUsersFn() {
    this.activeUser = true;
    this.modeDelivery = false;
  }

  modeDeliveryFn() {
    this.activeUser = false;
    this.modeDelivery = true;
  }

  locationFn() {
    this.activeUser = false;
    this.modeDelivery = false;
  }

  responseData = {
    activeUserData: "",
    locationData: ""
  };

  getActiveUsersData() {
    this.getData
      .getActiveUsersData()
      .subscribe((response: any) => {
        this.responseData.activeUserData = response.data;
      });
  }

  getLocationData() {
    this.getData
      .getLocationData()
      .subscribe((response: any) => {
        this.responseData.locationData = response.data;
      });
  }
  ngOnInit() {
    this.getActiveUsersData();
    this.getLocationData();
  }
}
