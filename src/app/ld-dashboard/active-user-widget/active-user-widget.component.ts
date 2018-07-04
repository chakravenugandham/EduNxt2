import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-active-user-widget",
  templateUrl: "./active-user-widget.component.html",
  styleUrls: ["./active-user-widget.component.scss"]
})
export class ActiveUserWidgetComponent implements OnInit, OnChanges {
  getTab = "activeUser";
  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getActiveUsersData();
      this.getLocationData();
    });

    this.getData.dateChange.subscribe(result => {
      this.getActiveUsersData();
      this.getLocationData();
    });

  }

  //fliter object for payload

  filtersData = {
    routeTo: "",
    filters: true,
    search: false,
    viewDetails: false,
    filterList: ["location"],
    currentModule: "",
    viewDetailsFilters: false
  };

  activeUser: boolean = true;
  modeDelivery: boolean = false;

  filterbody = {};

  activeUsersFn() {
    this.getTab = "activeUser";
  }

  modeDeliveryFn() {
    this.getTab = "modeDelivery";
  }

  locationFn() {
    this.getTab = "location";
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
  }

  ngOnInit() {
    this.getActiveUsersData();
    // this.getLocationData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.filterbody) {
      this.getActiveUsersData();
      this.getLocationData();
    }
  }
}
