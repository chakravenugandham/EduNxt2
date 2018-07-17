import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trackofgoals',
  templateUrl: './trackofgoals.component.html',
  styleUrls: ['./trackofgoals.component.scss']
})
export class TrackofgoalsComponent implements OnInit {

  filtersData = {
    routeTo: "orgPerformanceFullView",
    filters: false,
    search: true,
    viewDetails: true,
    filterList: ["zone"]
  };

  filterbody = {};

  constructor() { }

  getFilterObject($event) {
    this.filterbody = $event;
  }

  ngOnInit() {
  }

}
