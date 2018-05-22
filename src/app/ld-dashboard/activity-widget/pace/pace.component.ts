import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pace',
  templateUrl: './pace.component.html',
  styleUrls: ['./pace.component.scss']
})
export class PaceComponent implements OnInit {
  @Input() paceDataElement: { behindSchedule: number, haventStarted: number };

  constructor() { }

  ngOnInit() {
  }

}
