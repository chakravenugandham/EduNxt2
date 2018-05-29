import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notification-performance-widget",
  templateUrl: "./notification-performance-widget.component.html",
  styleUrls: ["./notification-performance-widget.component.scss"]
})
export class NotificationPerformanceWidgetComponent implements OnInit {
  routePath: string = "notificationPerformanceFullView";
  scheduled: boolean = true;
  constructor() {}

  ngOnInit() {}
  scheduledFn(){
    this.scheduled = true;
  }
  seenFn(){
    this.scheduled = false;
  }
}
