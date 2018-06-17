import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-active-user-widget",
  templateUrl: "./active-user-widget.component.html",
  styleUrls: ["./active-user-widget.component.scss"]
})
export class ActiveUserWidgetComponent implements OnInit, OnChanges {
  constructor(private getData: LdDashboardService) {}

  filtersData = {
    routeTo: "",
    filters: true,
    search: false,
    viewDetails: false,
    filterList: ["zone"],
    currentModule: ""
  };

  activeUser: boolean = true;
  modeDelivery: boolean = false;

  filterbody = {};

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
    this.getLocationData();
  }

  responseData = {
    activeUserData: "",
    locationData: ""
  };

  getActiveUsersData() {
    this.getData
      .getActiveUsersData(this.filterbody)
      .subscribe((response: any) => {
        this.responseData.activeUserData = response.data;
      });
  }

  getLocationData() {
    this.getData.getLocationData(this.filterbody).subscribe((response: any) => {
      this.responseData.locationData = response.data;
    });
  }

  getFilterObject($event) {
    this.filterbody = $event;
    this.getActiveUsersData();
    this.getLocationData();
    console.log("this.filterbody", this.filterbody);
  }

  ngOnInit() {
    this.getActiveUsersData();
    // this.getLocationData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.filterbody) {
      console.log("body changed");
      this.getActiveUsersData();
      this.getLocationData();
    }
  }
}
