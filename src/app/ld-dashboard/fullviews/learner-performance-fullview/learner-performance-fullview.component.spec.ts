import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnerPerformanceFullviewComponent } from './learner-performance-fullview.component';
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { PerformanceComponent } from "../../learners-performance-widget/performance/performance.component";
import { ProgressComponent } from "../../learners-performance-widget/progress/progress.component";
import { BarChartDirective } from "../../../directives/bar-chart.directive";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('LearnerPerformanceFullviewComponent', () => {
  let component: LearnerPerformanceFullviewComponent;
  let fixture: ComponentFixture<LearnerPerformanceFullviewComponent>;
  //let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerPerformanceFullviewComponent, PerformanceComponent, ProgressComponent, BarChartDirective],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerPerformanceFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
