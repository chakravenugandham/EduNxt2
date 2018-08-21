import { Component, OnInit, Output, EventEmitter, OnChanges } from "@angular/core";
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

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
  componentName: string;

  constructor(private dashboardService: LdDashboardService, private _window: Window, private filterData: CommonService, private router: Router, private route: ActivatedRoute) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getPrograms();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getPrograms();
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._baseUrl = event.url.replace(/\//g, '');
        this.csvFormatFn();
      }
    });
  }

  getFilterData() {
    this.componentName = this.filterData.learnerFilterBodyDetails["currentModule"];
    console.log(this.componentName);
    return this.componentName;
  }

  getPrograms() {
    this.dashboardService.getProgramData().subscribe((res: any) => {
      this.programsData = res.data;
    });
  }

  getCourses(programId) {
    this.dashboardService.getCoursesData(programId).subscribe((res: any) => {
      this.coursesData = res.data;
    });
  }

  getBatches(programId, courseId) {
    this.dashboardService.getBatchesData(programId, courseId).subscribe((res: any) => {
      this.batchesData = res.data;
    });
  }

  getSections(programId, courseId, batchId) {
    this.dashboardService.getSectionsData(programId, courseId, batchId).subscribe((res: any) => {
      this.sectionsData = res.data;
    });
  }

  changeProgram(programId) {
    this.programObj.programId = programId == "All Programs" ? 0 : programId;
    this.programObj.courseId = this.programObj.batchId = this.programObj.sectionId = 0;
    this.selectCourse = "All Courses";
    this.selectBatch = "All Batches";
    this.selectSection = "All Sections";
    this.coursesData = this.batchesData = this.sectionsData = [];
    this.getCourses(this.programObj.programId);
  }

  csvFormatFn() {
    let base = this._baseUrl;
    if (base == "contentConsumptionFullView") {
      this.downloadLink = this.dashboardService.getContentDetailsCsv();
    }
    if (base == "learnerTrackFullView") {
      //this.getFilterData();
      //this.downloadLink = this.dashboardService.getLearnerTrackDetailsCsv();
    }
    // if (base == "scoreDistributionFullView") {
    //   this.downloadLink = this.dashboardService.getScoresDetailsCsv();
    // }
    if (base == "orgPerformanceFullView") {
      let getTab = this.getFilterData();
      console.log(getTab);
      //this.componentName = this.filterData.learnerFilterBodyDetails["currentModule"];
      if (getTab == 'team') {
        // this.componentName = this.filterData.learnerFilterBodyDetails["currentModule"];
        // console.log(this.componentName);
        this.downloadLink = this.dashboardService.getTeamDataCsv();
      }
      if (getTab == 'trainer') {
        // this.componentName = this.filterData.learnerFilterBodyDetails["currentModule"];
        // console.log(this.componentName);
        this.downloadLink = this.dashboardService.getTrainersDataCsv();
      }
      if (getTab == 'learner') {
        // this.componentName = this.filterData.learnerFilterBodyDetails["currentModule"] == undefined ? "learner" : this.filterData.learnerFilterBodyDetails["currentModule"];
        // console.log(this.componentName);
        this.downloadLink = this.dashboardService.getLearnerDataCsv();
      }
    }
    if (base == "orgInterestFullView") {
      this.downloadLink = this.dashboardService.getOrgInterestDetailsDataCsv();
    }
  }
  changeCourse(courseId) {
    this.programObj.courseId = courseId == "All Courses" ? 0 : courseId;
    this.programObj.batchId = this.programObj.sectionId = 0;
    this.selectBatch = "All Batches";
    this.selectSection = "All Sections";
    this.batchesData = this.sectionsData = [];
    this.getBatches(this.programObj.programId, this.programObj.courseId);
  }

  changeBatch(batchId) {
    this.programObj.batchId = batchId == "All Batches" ? 0 : batchId;
    this.programObj.sectionId = 0;
    this.selectSection = "All Sections";
    this.sectionsData = [];
    this.getSections(this.programObj.programId, this.programObj.courseId, this.programObj.batchId);
  }

  changeSection(sectionId) {
    this.programObj.sectionId = sectionId == "All Sections" ? 0 : sectionId;
  }

  applyPrograms() {
    this.dashboardService.courseAndProgram(this.programObj);
  }

  onChangeCourse(courseId) {
    this.filterEvent.emit(courseId);
  }


  ngOnChanges(changes: any) {
    if (changes.downloadLink.currentValue) {
    }
  }

  ngOnInit() {
    this.getPrograms();
  }
}
