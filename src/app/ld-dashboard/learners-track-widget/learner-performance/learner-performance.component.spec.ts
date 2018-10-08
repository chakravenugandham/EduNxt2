import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnerPerformanceComponent } from './learner-performance.component';
import { DonutChartDirective } from "../../../directives/donut-chart.directive";
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('LearnerPerformanceComponent', () => {
  let component: LearnerPerformanceComponent;
  let fixture: ComponentFixture<LearnerPerformanceComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerPerformanceComponent, DonutChartDirective, CustomNumberPipe],
      imports: []
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
