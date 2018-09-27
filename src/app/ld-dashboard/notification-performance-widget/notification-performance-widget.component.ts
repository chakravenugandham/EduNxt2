import { Component, OnInit } from "@angular/core";
import { faQuestionCircle, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-notification-performance-widget",
  templateUrl: "./notification-performance-widget.component.html",
  styleUrls: ["./notification-performance-widget.component.scss"]
})
export class NotificationPerformanceWidgetComponent implements OnInit {

  //font-awesome classes
  faQuestionCircle = faQuestionCircle;
  faEllipsisV = faEllipsisV;

  getTab: string = "schedule";
  filtersData = {
    routeTo: "notificationPerformanceFullView",
    filters: false,
    search: false,
    viewDetails: false,
    filterList: ["zone"]
  };
  scheduled: boolean = true;
  constructor() { }

  scheduledFn() {
    this.getTab = "schedule";
  }
  seenFn() {
    this.getTab = "seen";
  }

  ngOnInit() { }
}
