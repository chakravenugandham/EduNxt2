import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-active-user-widget",
  templateUrl: "./active-user-widget.component.html",
  styleUrls: ["./active-user-widget.component.scss"]
})
export class ActiveUserWidgetComponent implements OnInit {
  getTab = "activeUser";
  constructor(private dashboardService: LdDashboardService) { }

  tooltipText = 'Active users data';

  //fliter object for payload

  filtersData = {
    routeTo: "",
    filters: false,
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
    this.tooltipText = 'Active users data';
  }

  modeDeliveryFn() {
    this.getTab = "modeDelivery";
    this.tooltipText = 'View Online vs Offline delivery over the last 30 days';
  }

  locationFn() {
    this.getTab = "location";
    this.tooltipText = 'Activity by Location';
  }

  getFilterObject($event) {
    this.filterbody = $event;
  }

  ngOnInit() {
    this.tooltipText = 'Active users data';
  }

}
