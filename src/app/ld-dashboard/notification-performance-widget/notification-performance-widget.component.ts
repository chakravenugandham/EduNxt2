import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-notification-performance-widget",
    templateUrl: "./notification-performance-widget.component.html",
    styleUrls: ["./notification-performance-widget.component.scss"]
})
export class NotificationPerformanceWidgetComponent implements OnInit {
    getTab: string;
    constructor() { }

    scheduledFn() { }
    seenFn() { }
    ngOnInit() { }
}
