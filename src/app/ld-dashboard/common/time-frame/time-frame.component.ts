import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

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

  constructor(private getData: LdDashboardService) {}

  getDataFromService() {
    this.getData.getCoursesData().subscribe((res: any) => {
      this.coursesData = res.data;
    });
  }

  onChangeCourse(courseId) {
    this.filterEvent.emit(courseId);
  }

  changeCourse(selectCourse) {
    let courseIdSelected;
    let progaramIdSelected;
    if (selectCourse == "All Courses") {
      courseIdSelected = 0;
      progaramIdSelected = 0;
    } else {
      for (let i in this.coursesData) {
        if (selectCourse == this.coursesData[i].courseName) {
          courseIdSelected = this.coursesData[i].courseId;
          progaramIdSelected = this.coursesData[i].progaramId;
        }
      }
    }
    this.getData.setHeaders({
      courseId: courseIdSelected,
      progaramId: progaramIdSelected
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
