import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notification-performance-fullview",
  templateUrl: "./notification-performance-fullview.component.html",
  styleUrls: ["./notification-performance-fullview.component.scss"]
})
export class NotificationPerformanceFullviewComponent implements OnInit {
  //global variable declaration
  contentData = [
    {
      notification: "Course Component update for",
      scheduledOn: "12:56PM, Feb 8",
      DeliveredOn: "12:56PM, Feb 8",
      TimesResponded: "73%",
      TimesSeen: "83%"
    },
    {
      notification: "Course Component update for",
      scheduledOn: "12:56PM, Feb 8",
      DeliveredOn: "12:56PM, Feb 8",
      TimesResponded: "73%",
      TimesSeen: "83%"
    },
    {
      notification: "Course Component update for",
      scheduledOn: "12:56PM, Feb 8",
      DeliveredOn: "Failed",
      TimesResponded: "73%",
      TimesSeen: "83%"
    },
    {
      notification: "Course Component update for",
      scheduledOn: "12:56PM, Feb 8",
      DeliveredOn: "12:56PM, Feb 8",
      TimesResponded: "73%",
      TimesSeen: "83%"
    },
    {
      notification: "Course Component update for",
      scheduledOn: "12:56PM, Feb 8",
      DeliveredOn: "12:56PM, Feb 8",
      TimesResponded: "73%",
      TimesSeen: "83%"
    },
    {
      notification: "Course Component update for",
      scheduledOn: "12:56PM, Feb 8",
      DeliveredOn: "12:56PM, Feb 8",
      TimesResponded: "73%",
      TimesSeen: "83%"
    }
  ];
  constructor() { }

  ngOnInit() { }
}
