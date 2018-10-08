import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnerPaceComponent } from './learner-pace.component';
import { DonutChartDirective } from "../../../directives/donut-chart.directive";
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('LearnerPaceComponent', () => {
  let component: LearnerPaceComponent;
  let fixture: ComponentFixture<LearnerPaceComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerPaceComponent, DonutChartDirective, CustomNumberPipe],
      imports: []
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
