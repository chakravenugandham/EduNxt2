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
    let progaramId;
    for (let i in this.coursesData) {
      if (selectCourse == this.coursesData[i].courseId) {
        progaramId = this.coursesData[i].progaramId;
      }
    }
    this.getData.setHeaders({
      courseId: selectCourse,
      progaramId: progaramId
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
