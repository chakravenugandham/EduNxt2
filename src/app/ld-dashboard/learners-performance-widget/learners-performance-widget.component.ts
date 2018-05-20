import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learners-performance-widget',
  templateUrl: './learners-performance-widget.component.html',
  styleUrls: ['./learners-performance-widget.component.css']
})
export class LearnersPerformanceWidgetComponent implements OnInit {

  performance:boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
