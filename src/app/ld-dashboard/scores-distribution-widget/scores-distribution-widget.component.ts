import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scores-distribution-widget',
  templateUrl: './scores-distribution-widget.component.html',
  styleUrls: ['./scores-distribution-widget.component.scss']
})
export class ScoresDistributionWidgetComponent implements OnInit {

  testScore: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
