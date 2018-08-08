import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { ExcelService } from '../../common-services/excel.service'

import { _ } from "underscore";

@Component({
  selector: "app-time-frame",
  templateUrl: "./time-frame.component.html",
  styleUrls: ["./time-frame.component.scss"]
})
export class TimeFrameComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<any>();
  coursesData = [];
  today: Date = new Date();
  selectCourse: any = "All Courses";

  data = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];
  csvResponse = [];
  constructor(private dashboardService: LdDashboardService, private excelService: ExcelService) {
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

  exportAsXLSX() {
    //this.excelService.exportAsExcelFile(this.data, 'sample');
    this.dashboardService.getContentCsv().subscribe((response: any) => {
      this.csvResponse = response.data;
      console.log(this.csvResponse);

    });
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

  ngOnInit() {
    this.getDataFromService();
  }
}
