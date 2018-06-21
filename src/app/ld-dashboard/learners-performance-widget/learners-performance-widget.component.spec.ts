import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnersPerformanceWidgetComponent } from './learners-performance-widget.component';
import { LdDashboardService } from "../services/ld-dashboard.service";
import { PerformanceComponent } from "./performance/performance.component";
import { ProgressComponent } from "./progress/progress.component";
import { BarChartDirective } from "../../directives/bar-chart.directive";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterWidgetComponent } from "../shared/filter-widget/filter-widget.component";
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('LearnersPerformanceWidgetComponent', () => {
  let component: LearnersPerformanceWidgetComponent;
  let fixture: ComponentFixture<LearnersPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnersPerformanceWidgetComponent, PerformanceComponent, ProgressComponent, BarChartDirective, FilterWidgetComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnersPerformanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create performanceFn', () => {
    component.performanceFn();
    expect(component.performanceFn).toBeTruthy();
  });

  it('should create progressFn', () => {
    component.progressFn();
    expect(component.progressFn).toBeTruthy();
  });

  it('should create getFilterObject', () => {
    let $event;
    component.getFilterObject($event);
    expect(component.getFilterObject).toBeTruthy();
  });

  it('should create getDataFromService', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeTruthy();
  });

});
