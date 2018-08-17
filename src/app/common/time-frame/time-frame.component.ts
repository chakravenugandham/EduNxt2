import { Component, OnInit, Output, EventEmitter, OnChanges } from "@angular/core";
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { ActivatedRoute, Router } from '@angular/router';

import { _ } from "underscore";
import { CommonService } from "../../common-services/common.service";

@Component({
  selector: "app-time-frame",
  templateUrl: "./time-frame.component.html",
  styleUrls: ["./time-frame.component.scss"]
})
export class TimeFrameComponent implements OnInit, OnChanges {
  @Output() filterEvent = new EventEmitter<any>();
  coursesData = [];
  today: Date = new Date();
  selectCourse: any = "All Courses";
  downloadLink: string;
  _baseUrl;
  csvResponse = [];
  constructor(private dashboardService: LdDashboardService, private _window: Window) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  check_obj() {
    let arrayOne = [{
      "noOfAttempts": 0,
      "Progress": 0,
      "scoreAvg": 0,
      "id": 59,
      "name": "201801"
    },
    {
      "noOfAttempts": 0,
      "Progress": 0,
      "scoreAvg": 0,
      "id": 1,
      "name": "Default"
    },
    {
      "noOfAttempts": 0,
      "Progress": 0,
      "scoreAvg": 0,
      "id": 67,
      "name": "201804"
    },
    {
      "noOfAttempts": 0,
      "Progress": 0,
      "scoreAvg": 0,
      "id": 75,
      "name": "201806"
    }];

    let element1 = {
      "noOfAttempts": 0,
      "Progress": 0,
      "scoreAvg": 0,
      "id": 59,
      "name": "201801"
    }



    // console.log("object", _.find(arrayOne, element1));

    let indexFoundAt = _.findIndex(arrayOne, element1);

    console.log("object", indexFoundAt);

  }

  getRouteData(urlname) {
    this._baseUrl = this._window.location.href;
    let base = this._baseUrl.split('/')[4];
    //base = base.substring(1, base.length);
    console.log(this._baseUrl);
    console.log(base);

    // if(base == 'contentConsumptionFullView'){
    //   this.dashboardService.getContentDetailsCsv().subscribe((res:any)=>{

    //   })
    // }
  }

  getDataFromService() {
    this.dashboardService.getCoursesData().subscribe((res: any) => {
      this.coursesData = res.data;
    });
  }

  onChangeCourse(courseId) {
    this.filterEvent.emit(courseId);
  }

  changeCourse(selectCourse) {
    let courseIdSelected;
    let programIdSelected;
    if (selectCourse == "All Courses") {
      courseIdSelected = 0;
      programIdSelected = 0;
    } else {
      for (let i in this.coursesData) {
        if (selectCourse == this.coursesData[i].courseName) {
          courseIdSelected = this.coursesData[i].courseId;
          programIdSelected = this.coursesData[i].programId;
        }
      }
    }
    this.dashboardService.courseAndProgram({
      courseId: courseIdSelected,
      programId: programIdSelected
    });
  }

  ngOnChanges(changes: any) {
    if (changes._baseUrl.currentValue) {
      this._baseUrl = this._window.location.href;
    }
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
