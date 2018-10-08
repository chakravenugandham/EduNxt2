import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { ScoresDistributionWidgetComponent } from './scores-distribution-widget.component';
import { LdDashboardService } from "../services/ld-dashboard.service";
import { QuizComponent } from "./quiz/quiz.component";
import { AssignmentComponent } from "./assignment/assignment.component";
import { TestScoresComponent } from "./test-scores/test-scores.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";
import { ScoreChartDirective } from "../../directives/score-chart.directive";

import { ClickOutsideModule } from 'ng4-click-outside';
import { SpinnerComponent } from "../../common/spinner/spinner.component";
import { CustomNumberPipe } from "../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../app/shared/text-transform.pipe';
import { CookieService } from 'ngx-cookie-service';
import { PaginateComponent } from "../../common/paginate/paginate.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ScoresDistributionWidgetComponent', () => {
  let component: ScoresDistributionWidgetComponent;
  let fixture: ComponentFixture<ScoresDistributionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoresDistributionWidgetComponent, QuizComponent, AssignmentComponent,
        TestScoresComponent, FilterWidgetComponent, ScoreChartDirective, SpinnerComponent, CustomNumberPipe, TextTransformPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [HttpClientTestingModule, FormsModule, ClickOutsideModule, NgbModule.forRoot(), RouterModule.forRoot([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresDistributionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create testScoreFn', () => {
    component.testScoreFn();
    expect(component.testScoreFn).toBeTruthy();
  });

  it('should create quizScoreFn', () => {
    component.quizScoreFn();
    expect(component.quizScoreFn).toBeTruthy();
  });

  it('should create assignmentFn', () => {
    component.assignmentFn();
    expect(component.assignmentFn).toBeTruthy();
  });

  it('should create addFilters', () => {
    let $event;
    component.addFilters($event);
    expect(component.addFilters).toBeTruthy();
  });

});
