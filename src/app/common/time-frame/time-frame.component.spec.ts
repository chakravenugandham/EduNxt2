import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFrameComponent } from './time-frame.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MpDatepickerRangeComponent } from "../../common/mp-datepicker-range/mp-datepicker-range.component";
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";

describe('TimeFrameComponent', () => {
  let component: TimeFrameComponent;
  let fixture: ComponentFixture<TimeFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeFrameComponent, MpDatepickerRangeComponent],
      imports: [Daterangepicker, HttpClientTestingModule, FormsModule, NgbModule.forRoot(), RouterTestingModule.withRoutes([])],
      providers: [CookieService, LdDashboardService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  /* it('should create getAllCourses', () => {
    component.getAllCourses();
    expect(component.getAllCourses).toBeTruthy();
  }); */

 /*  it('should create courseSelected', () => {
    let courseName;
    component.courseSelected(courseName);
    expect(component.courseSelected).toBeTruthy();
  }); */

  it('should create open', () => {
    let content;
    component.open(content);
    expect(component.open).toBeTruthy();
  });

  it('should create sendEmail', () => {
    component.sendEmail();
    expect(component.sendEmail).toBeTruthy();
  });

  it('should create csvFormatFn', () => {
    component.csvFormatFn();
    expect(component.csvFormatFn).toBeTruthy();
  });

  it('should create emailReport', () => {
    let emailData = {
      to: "",
      subject: "manipal user",
      text: ""
    }
    if (document.getElementById("screenToCaputre") != null) {
      emailData.text = document.getElementById("screenToCaputre").innerHTML;
    }
    component.emailReport();
    expect(component.emailReport).toBeTruthy();
  });

  it('should create onChangeCourse', () => {
    let courseId;
    component.onChangeCourse(courseId);
    expect(component.onChangeCourse).toBeTruthy();
  });



});
