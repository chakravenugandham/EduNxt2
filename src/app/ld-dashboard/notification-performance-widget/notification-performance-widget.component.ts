import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notification-performance-widget",
  templateUrl: "./notification-performance-widget.component.html",
  styleUrls: ["./notification-performance-widget.component.scss"]
})
export class NotificationPerformanceWidgetComponent implements OnInit {
  routePath: string = "notificationPerformanceFullView";

  getTab: string = "schedule";
  filtersData = {
    routeTo: "notificationPerformanceFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["zone"]
  };
  scheduled: boolean = true;
  constructor() { }

  scheduledFn() {
    this.getTab = "schedule";
  }
  seenFn() {
    this.getTab = "seen"
  }

  ngOnInit() { }

}
