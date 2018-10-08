import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnersTrackWidgetComponent } from './learners-track-widget.component';
import { DonutChartDirective } from "../../directives/donut-chart.directive";
import { LearnerPaceComponent } from "./learner-pace/learner-pace.component";
import { LearnerPerformanceComponent } from "./learner-performance/learner-performance.component";
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { CustomNumberPipe } from "../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../app/shared/text-transform.pipe';
import { PaginateComponent } from '../../common/paginate/paginate.component';
import { CookieService } from 'ngx-cookie-service';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('LearnersTrackWidgetComponent', () => {
  let component: LearnersTrackWidgetComponent;
  let fixture: ComponentFixture<LearnersTrackWidgetComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnersTrackWidgetComponent, DonutChartDirective, LearnerPaceComponent, LearnerPerformanceComponent, FilterWidgetComponent, SpinnerComponent, CustomNumberPipe, TextTransformPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([]), ClickOutsideModule, NgbModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnersTrackWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create learnerPaceFn', () => {
    component.learnerPaceFn();
    expect(component.learnerPaceFn).toBeTruthy();
  });

  it('should create learnerPerfFn', () => {
    component.learnerPerfFn();
    expect(component.learnerPerfFn).toBeTruthy();
  });

  it('should create getDataFromService', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeTruthy();
  });

  it('should create addFilters', () => {
    let $event;
    component.addFilters($event);
    expect(component.addFilters).toBeTruthy();
  });

});
