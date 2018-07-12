import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learnersquiz',
  templateUrl: './learnersquiz.component.html',
  styleUrls: ['./learnersquiz.component.scss']
})
export class LearnersquizComponent implements OnInit {
  getTab: string = "quiz";

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

  quizFn() {
    this.getTab = "quiz";
  }
  assignmentFn() {
    this.getTab = "assignment";
  }

  getFilterObject($event) {
    this.filterbody = $event;
  }

  ngOnInit() {
  }

}
