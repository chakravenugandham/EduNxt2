import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courseinsight',
  templateUrl: './courseinsight.component.html',
  styleUrls: ['./courseinsight.component.scss']
})
export class CourseinsightComponent implements OnInit {

  getTab: string = "facultyperformance";

  filtersData = {
    routeTo: "learnerQuizFullView",
    filters: false,
    search: true,
    viewDetails: true,
    filterList: ["zone"],
    currentModule: this.getTab
  };

  filterbody = {};

  constructor() { }

  getFilterObject($event) {
    this.filterbody = $event;
  }


  ngOnInit() {
  }

}
