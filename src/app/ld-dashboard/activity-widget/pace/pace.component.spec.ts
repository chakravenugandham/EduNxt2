import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { PaceComponent } from './pace.component';
import { DonutChartDirective } from "../../../directives/donut-chart.directive";

fdescribe('PaceComponent', () => {
  let component: PaceComponent;
  let fixture: ComponentFixture<PaceComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaceComponent, DonutChartDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaceComponent);
    component = fixture.componentInstance;
    component.paceDataElement = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
