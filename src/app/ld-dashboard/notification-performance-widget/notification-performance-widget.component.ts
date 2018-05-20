import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-performance-widget',
  templateUrl: './notification-performance-widget.component.html',
  styleUrls: ['./notification-performance-widget.component.css']
})
export class NotificationPerformanceWidgetComponent implements OnInit {

  scheduled:boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
