import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnerTrackFullviewComponent } from './learner-track-fullview.component';
import { LearnerPaceComponent } from "../../learners-track-widget/learner-pace/learner-pace.component";
import { LearnerPerformanceComponent } from "../../learners-track-widget/learner-performance/learner-performance.component";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { DonutChartDirective } from "../../../directives/donut-chart.directive";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LearnerTrackFullviewComponent', () => {
  let component: LearnerTrackFullviewComponent;
  let fixture: ComponentFixture<LearnerTrackFullviewComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerTrackFullviewComponent, LearnerPaceComponent, LearnerPerformanceComponent, DonutChartDirective],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerTrackFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
