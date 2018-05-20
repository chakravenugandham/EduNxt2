import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-performance-widget',
  templateUrl: './org-performance-widget.component.html',
  styleUrls: ['./org-performance-widget.component.css']
})
export class OrgPerformanceWidgetComponent implements OnInit {

  trainers:boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
