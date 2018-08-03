import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnersTrackWidgetComponent } from './learners-track-widget.component';
import { DonutChartDirective } from "../../ld-dashboard/directives/donut-chart.directive";
import { LearnerPaceComponent } from "./learner-pace/learner-pace.component";
import { LearnerPerformanceComponent } from "./learner-performance/learner-performance.component";
import { FilterWidgetComponent } from "../common/filter-widget/filter-widget.component";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


describe('LearnersTrackWidgetComponent', () => {
  let component: LearnersTrackWidgetComponent;
  let fixture: ComponentFixture<LearnersTrackWidgetComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnersTrackWidgetComponent, DonutChartDirective, LearnerPaceComponent, LearnerPerformanceComponent, FilterWidgetComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
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

  it('should create getData', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeTruthy();
  });

  it('should create getFilterObject', () => {
    let $event;
    component.getFilterObject($event);
    expect(component.getFilterObject).toBeTruthy();
  });

});
