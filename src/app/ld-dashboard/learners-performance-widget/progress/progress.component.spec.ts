import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { ProgressComponent } from './progress.component';
import { BarChartDirective } from "../../../directives/bar-chart.directive";

fdescribe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressComponent, BarChartDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    component.progressData = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
