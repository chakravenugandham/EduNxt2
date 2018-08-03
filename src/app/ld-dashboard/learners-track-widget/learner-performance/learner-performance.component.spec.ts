import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnerPerformanceComponent } from './learner-performance.component';
import { DonutChartDirective } from "../../../ld-dashboard/directives/donut-chart.directive";

describe('LearnerPerformanceComponent', () => {
  let component: LearnerPerformanceComponent;
  let fixture: ComponentFixture<LearnerPerformanceComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerPerformanceComponent, DonutChartDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerPerformanceComponent);
    component = fixture.componentInstance;
    component.performanceData = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
