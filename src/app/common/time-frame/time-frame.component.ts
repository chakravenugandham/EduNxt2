import { Component, OnInit, Output, EventEmitter, OnChanges, Inject } from "@angular/core";
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";


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
  closeResult: string;
  programObj = {
    programId: 0,
    courseId: 0,
    batchId: 0,
    sectionId: 0
  }

  emailData = {
    to: "rajeshadhikari72@gmail.com",
    subject: "manipal user",
    text: ""
  }
  myStorage = window.localStorage;
  orgPerformanceComponentName: string;
  learnerTrackComponentName: string;
  learnerDisplayFor: string;
  scoreComponent: string;

  constructor(@Inject(LdDashboardService) private dashboardService: LdDashboardService, @Inject(Window) private _window: Window, @Inject(CommonService) private filterData: CommonService, @Inject(Router) private router: Router, @Inject(ActivatedRoute) private route: ActivatedRoute, @Inject(NgbModal) private modalService: NgbModal) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getAllCourses();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getAllCourses();
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._baseUrl = event.url.replace(/\//g, '');
        // this.csvFormatFn();
      }
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
        console.log(this.downloadLink);
      });
    }

    if (base == "learnerTrackFullView") {
      this.learnerTrackComponentName = this.myStorage.getItem('trackComponent');
      this.learnerDisplayFor = this.myStorage.getItem('trackDisplayFor');
      this.dashboardService.getLearnerTrackDetailsCsv(this.learnerTrackComponentName).subscribe((res: any) => {
        this.downloadLink = res.data;
        console.log(this.downloadLink);
      });
    }

    if (base == "scoreDistributionFullView") {
      this.scoreComponent = this.myStorage.getItem('scoreComponent');
      this.dashboardService.getScoresDetailsCsv(this.scoreComponent).subscribe((res: any) => {
        this.downloadLink = res.data;
        console.log(this.downloadLink);
      });
    }

    if (base == "orgPerformanceFullView") {
      this.orgPerformanceComponentName = this.myStorage.getItem('orgPerformaModule');

      if (this.orgPerformanceComponentName === 'teams') {
        this.dashboardService.getTeamDataCsv().subscribe((res: any) => {
          this.downloadLink = res.data;
          console.log(this.downloadLink);
        });
      }
      else if (this.orgPerformanceComponentName === 'trainers') {
        this.dashboardService.getTrainersDataCsv().subscribe((res: any) => {
          this.downloadLink = res.data;
          console.log(this.downloadLink);
        });
      }
      else if (this.orgPerformanceComponentName === 'learner') {
        this.dashboardService.getLearnerDataCsv().subscribe((res: any) => {
          this.downloadLink = res.data;
          console.log(this.downloadLink);
        });
      }
    }

    if (base == "orgInterestFullView") {
      this.dashboardService.getOrgInterestDetailsDataCsv().subscribe((res: any) => {
        this.downloadLink = res.data;
        console.log(this.downloadLink);

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
        console.log(this.closeResult);
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
      console.log(response);
    });
  }

  downloadPdf() {
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

  emailReport() {
    this.emailData.text = document.getElementById("screenToCaputre").innerHTML;
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

  ngOnChanges(changes: any) {
    if (changes.orgPerformtab.currentValue) {
      // this.orgPerformtab = this.myStorage.getItem('orgPerformShowDetails');
    }
  }

  ngOnInit() {
    //this.getDataFromService();
    //this.csvFormatFn();
    this.getAllCourses();
  }
}

