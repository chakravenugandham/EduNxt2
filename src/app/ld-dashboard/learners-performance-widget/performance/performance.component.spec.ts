import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { PerformanceComponent } from './performance.component';
import { BarChartDirective } from "../../../directives/bar-chart.directive";

fdescribe('PerformanceComponent', () => {
  let component: PerformanceComponent;
  let fixture: ComponentFixture<PerformanceComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceComponent, BarChartDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceComponent);
    component = fixture.componentInstance;
    component.performanceData = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
