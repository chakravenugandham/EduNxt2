import { Component, OnInit, Output, EventEmitter, OnChanges } from "@angular/core";
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

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
  myStorage = window.localStorage;
  orgPerformanceComponentName: string;
  learnerTrackComponentName: string;
  learnerDisplayFor: string;
  orgPerformtab: string;

  constructor(private dashboardService: LdDashboardService, private _window: Window, private filterData: CommonService, private router: Router, private route: ActivatedRoute) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getAllCourses();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getAllCourses();
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._baseUrl = event.url.replace(/\//g, '');
        this.csvFormatFn();
      }
    });

    this.orgPerformanceComponentName = this.myStorage.getItem('orgPerformanceCurrentModule');
    this.learnerTrackComponentName = this.myStorage.getItem('learnerTrackCurrentModule');
    this.learnerDisplayFor = this.myStorage.getItem('displayFor');
    this.orgPerformtab = this.myStorage.getItem('orgPerformShowDetails');
    console.log(this.orgPerformtab);
    console.log(this.learnerDisplayFor);
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
          this.programObj.programId = this.coursesData[i].programId;
          this.programObj.courseId = this.coursesData[i].courseId;
        }
      }
    }
    this.dashboardService.courseAndProgram(this.programObj);
  }

  csvFormatFn() {
    let base = this._baseUrl;

    if (base == "contentConsumptionFullView") {
      this.downloadLink = this.dashboardService.getContentDetailsCsv();
    }
    if (base == "learnerTrackFullView") {
      console.log(this.learnerTrackComponentName);
      console.log(this.learnerDisplayFor);
      this.downloadLink = this.dashboardService.getLearnerTrackDetailsCsv(this.learnerTrackComponentName);
    }
    // if (base == "scoreDistributionFullView") {
    //   this.downloadLink = this.dashboardService.getScoresDetailsCsv();
    // }

    if (base == "orgPerformanceFullView") {
      if (this.orgPerformanceComponentName == 'team') {
        this.downloadLink = this.dashboardService.getTeamDataCsv();
      }
      if (this.orgPerformanceComponentName == 'trainer') {
        this.downloadLink = this.dashboardService.getTrainersDataCsv();
      }
      if (this.orgPerformanceComponentName == 'learner') {
        this.downloadLink = this.dashboardService.getLearnerDataCsv();
      }
    }
    if (base == "orgInterestFullView") {
      this.downloadLink = this.dashboardService.getOrgInterestDetailsDataCsv();
    }
  }

  captureScreen() {
    let htmlTemp = document.getElementById("screenToCaputre");
    html2canvas(htmlTemp).then(canvas => {
      // Few necessary setting options  
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('./');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

      pdf.save('MYPdf.pdf'); // Generated PDF   
    });

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

  ngOnChanges(changes: any) {
    if (changes.orgPerformtab.currentValue) {
      this.orgPerformtab = this.myStorage.getItem('orgPerformShowDetails');
      console.log(this.orgPerformtab);
    }
  }

  ngOnInit() {
    //this.getDataFromService();
    this.csvFormatFn();
    this.getAllCourses();
  }
}

