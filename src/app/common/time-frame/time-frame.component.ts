import { Component, OnInit, Output, EventEmitter, OnChanges } from "@angular/core";
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-time-frame",
  templateUrl: "./time-frame.component.html",
  styleUrls: ["./time-frame.component.scss"]
})
export class TimeFrameComponent implements OnInit, OnChanges {
  @Output() filterEvent = new EventEmitter<any>();

  coursesData = [];
  programsData = [];
  batchesData = [];
  sectionsData = [];

  today: Date = new Date();
  selectCourse: any = "All Courses";
  selectProgram = "All Programs";
  selectBatch = "All Batches";
  selectSection = "All Sections";
  downloadLink: string;
  _baseUrl;
  csvResponse = [];
  programObj = {
    programId: 0,
    courseId: 0,
    batchId: 0,
    sectionId: 0
  }
  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      // this.getAllCourses();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      // this.getAllCourses();
    });
  }

  getAllCourses() {
    this.dashboardService.getCoursesProgramData().subscribe((res: any) => {
      this.coursesData = res.data;
    });
  }

  courseSelected(courseName) {
    if (courseName == "All Courses") {
      this.programObj.programId = 0;
      this.programObj.courseId = 0;
    }
    else {
      for (let i in this.coursesData) {
        if (courseName == this.coursesData[i].courseName) {
          this.programObj.programId = this.coursesData[i].programId
          this.programObj.courseId = this.coursesData[i].courseId
        }
      }
    }
    this.dashboardService.courseAndProgram(this.programObj);
  }

  // getPrograms() {
  //   this.dashboardService.getProgramData().subscribe((res: any) => {
  //     this.programsData = res.data;
  //   });
  // }

  // getCourses(programId) {
  //   this.dashboardService.getCoursesData(programId).subscribe((res: any) => {
  //     this.coursesData = res.data;
  //   });
  // }

  // getBatches(programId, courseId) {
  //   this.dashboardService.getBatchesData(programId, courseId).subscribe((res: any) => {
  //     this.batchesData = res.data;
  //   });
  // }

  // getSections(programId, courseId, batchId) {
  //   this.dashboardService.getSectionsData(programId, courseId, batchId).subscribe((res: any) => {
  //     this.sectionsData = res.data;
  //   });
  // }

  // changeProgram(programId) {
  //   this.programObj.programId = programId == "All Programs" ? 0 : programId;
  //   this.programObj.courseId = this.programObj.batchId = this.programObj.sectionId = 0;
  //   this.selectCourse = "All Courses";
  //   this.selectBatch = "All Batches";
  //   this.selectSection = "All Sections";
  //   this.coursesData = this.batchesData = this.sectionsData = [];
  //   this.getCourses(this.programObj.programId);
  // }

  // changeCourse(courseId) {
  //   this.programObj.courseId = courseId == "All Courses" ? 0 : courseId;
  //   this.programObj.batchId = this.programObj.sectionId = 0;
  //   this.selectBatch = "All Batches";
  //   this.selectSection = "All Sections";
  //   this.batchesData = this.sectionsData = [];
  //   this.getBatches(this.programObj.programId, this.programObj.courseId);
  // }

  // changeBatch(batchId) {
  //   this.programObj.batchId = batchId == "All Batches" ? 0 : batchId;
  //   this.programObj.sectionId = 0;
  //   this.selectSection = "All Sections";
  //   this.sectionsData = [];
  //   this.getSections(this.programObj.programId, this.programObj.courseId, this.programObj.batchId);
  // }

  // changeSection(sectionId) {
  //   this.programObj.sectionId = sectionId == "All Sections" ? 0 : sectionId;
  // }

  // applyPrograms() {
  //   this.dashboardService.courseAndProgram(this.programObj);
  // }

  onChangeCourse(courseId) {
    this.filterEvent.emit(courseId);
  }

  csvFormatFn() {
    // this._baseUrl = this._window.location.href;
    this._baseUrl = window.location.href;
    let base = this._baseUrl.split('/')[4];
    if (base == "contentConsumptionFullView") {
      this.downloadLink = this.dashboardService.getContentDetailsCsv();
    }
  }


  ngOnChanges(changes: any) {
    if (changes.downloadLink.currentValue) {
    }
  }

  ngOnInit() {
    //this.getDataFromService();
    this.csvFormatFn();
    this.getAllCourses();
  }
}
