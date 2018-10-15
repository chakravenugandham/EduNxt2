import { Component, OnInit, Output, EventEmitter, OnChanges, Inject } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: "app-time-frame",
  templateUrl: "./time-frame.component.html",
  styleUrls: ["./time-frame.component.scss"]
})
export class TimeFrameComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<any>();

  coursesData = [];
  programsData = [];
  batchesData = [];
  sectionsData = [];

  today: Date = new Date();
  selectCourse = "All Courses";
  selectProgram = "All Programs";
  selectBatch = "All Batches";
  selectSection = "All Sections";
  downloadLink: string;
  _baseUrl;

  closeResult: string;
  programObj = {
    programId: 0,
    courseId: 0,
    batchId: 0,
    sectionId: 0
  }

  emailData = {
    to: "",
    subject: "manipal user",
    text: ""
  }
  myStorage = window.localStorage;
  orgPerformanceComponentName: string;
  learnerTrackComponentName: string;
  learnerDisplayFor: string;
  scoreComponent: string;
  csvDownloadflag: boolean = false;

  constructor(@Inject(LdDashboardService) private dashboardService: LdDashboardService, @Inject(Router) private router: Router, @Inject(NgbModal) private acivatedRoute: ActivatedRoute, @Inject(NgbModal) private modalService: NgbModal, private commonService: CommonService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getAllCourses();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getAllCourses();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getAllCourses();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      // this.selectCourse = "All Courses";
      // this.programObj.programId = 0;
      // this.programObj.courseId = 0;
      // this.dashboardService.courseAndProgram(this.programObj);
      this.getAllCourses();
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._baseUrl = event.url.replace(/\//g, '');
        this.commonService.changeRoute(this._baseUrl);
        this.csvDownloadflag = (this._baseUrl === '' || this._baseUrl === 'LnD') ? false : true;
      }
    });
  }

  apiUrl = "learner-leaderboard";

  getAllCourses() {
    // this.coursesData = [];
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
      this.dashboardService.getContentDetailsCsv().subscribe((res: any) => {
        this.downloadLink = res.data;
        window.open(res.data, "_self");
      });
    }

    else if (base == "learnerTrackFullView") {
      this.learnerTrackComponentName = this.myStorage.getItem('trackComponent');
      this.learnerDisplayFor = this.myStorage.getItem('trackDisplayFor');
      this.dashboardService.getLearnerTrackDetailsCsv(this.learnerTrackComponentName, this.learnerDisplayFor).subscribe((res: any) => {
        this.downloadLink = res.data;
        window.open(res.data, "_self");
      });
    }

    else if (base == "scoreDistributionFullView") {
      this.scoreComponent = this.myStorage.getItem('scoreComponent');
      if (this.scoreComponent === 'test') {
        this.dashboardService.getScoresDetailsCsv(this.scoreComponent).subscribe((res: any) => {
          this.downloadLink = res.data;
          window.open(res.data, "_self");
        });
      }
      else if (this.scoreComponent === 'quiz') {
        this.dashboardService.getScoresDetailsCsv(this.scoreComponent).subscribe((res: any) => {
          this.downloadLink = res.data;
          window.open(res.data, "_self");
        });
      }
      else if (this.scoreComponent === 'assignment') {
        this.dashboardService.getScoresDetailsCsv(this.scoreComponent).subscribe((res: any) => {
          this.downloadLink = res.data;
          window.open(res.data, "_self");
        });
      }
    }

    else if (base == "orgPerformanceFullView") {
      this.orgPerformanceComponentName = this.myStorage.getItem('orgPerformaModule');
      if (this.orgPerformanceComponentName === 'teams') {
        this.dashboardService.getTeamDataCsv().subscribe((res: any) => {
          this.downloadLink = res.data;
          window.open(res.data, "_self");
        });
      }
      else if (this.orgPerformanceComponentName === 'trainers') {
        this.dashboardService.getTrainersDataCsv().subscribe((res: any) => {
          this.downloadLink = res.data;
          window.open(res.data, "_self");
        });
      }
      else if (this.orgPerformanceComponentName === 'learners') {
        this.dashboardService.getLearnerDataCsv().subscribe((res: any) => {
          this.downloadLink = res.data;
          window.open(res.data, "_self");
        });
      }
    }

    else if (base == "orgInterestFullView") {
      this.dashboardService.getOrgInterestDetailsDataCsv().subscribe((res: any) => {
        this.downloadLink = res.data;
        window.open(res.data, "_self");
      });
    }
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  sendEmail() {
    this.dashboardService.emailReportService(this.emailData).subscribe((response: any) => {
    });
  }

  downloadPdf() {

    // Few necessary setting options  
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  

    if (!this.csvDownloadflag) {
      html2canvas(document.getElementById("dashboard_part_one")).then(canvas => {
        let dashboard_part_one = canvas.toDataURL('./');
        pdf.addImage(dashboard_part_one, 'JPEG', 0, 0, 210, 280);

        html2canvas(document.getElementById("dashboard_part_two")).then(canvas => {
          let dashboard_part_two = canvas.toDataURL('./');
          pdf.addPage();
          pdf.addImage(dashboard_part_two, 'JPEG', 0, 0, 210, 210);
          pdf.save('EduNxtReport.pdf'); // Generated PDF  
        });
      });
    }

    if (this.csvDownloadflag) {
      html2canvas(document.getElementById("dashboard_part_one")).then(canvas => {
        let dashboard_part_one = canvas.toDataURL('./');
        pdf.addImage(dashboard_part_one, 'JPEG', 0, 0, 210, 280);
        pdf.save('EduNxtReport.pdf'); // Generated PDF  
      });
    }

  }

  emailReport() {
    if (document.getElementById("screenToCaputre") != null) {
      this.emailData.text = document.getElementById("screenToCaputre").innerHTML;
    }

    // this.dashboardService.emailReportService(this.emailData).subscribe((response: any) => {
    //   console.log(response);
    // });
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


  ngOnInit() {
    //this.getDataFromService();
    //this.csvFormatFn();
    this.getAllCourses();
  }
}

