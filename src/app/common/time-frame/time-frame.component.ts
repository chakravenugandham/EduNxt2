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

  exportAsXLSX() {
    // this.sub = this.route.params.subscribe(params => {
    //   console.log(params);
    // });

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
