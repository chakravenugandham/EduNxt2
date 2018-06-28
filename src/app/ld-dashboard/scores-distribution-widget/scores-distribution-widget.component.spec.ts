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
import { FilterWidgetComponent } from "../common/filter-widget/filter-widget.component";
import { ScoreChartDirective } from "../../ld-dashboard/directives/score-chart.directive";

fdescribe('ScoresDistributionWidgetComponent', () => {
  let component: ScoresDistributionWidgetComponent;
  let fixture: ComponentFixture<ScoresDistributionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoresDistributionWidgetComponent, QuizComponent, AssignmentComponent,
        TestScoresComponent, FilterWidgetComponent, ScoreChartDirective],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
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

  it('should create getFilterObject', () => {
    let $event;
    component.getFilterObject($event);
    expect(component.getFilterObject).toBeTruthy();
  });

});
