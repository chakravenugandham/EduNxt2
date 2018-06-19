import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnerPaceComponent } from './learner-pace.component';
import { DonutChartDirective } from "../../../directives/donut-chart.directive";

fdescribe('LearnerPaceComponent', () => {
  let component: LearnerPaceComponent;
  let fixture: ComponentFixture<LearnerPaceComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerPaceComponent, DonutChartDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerPaceComponent);
    component = fixture.componentInstance;
    component.paceData = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
