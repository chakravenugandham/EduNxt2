import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { TimespentComponent } from './timespent.component';
import { HalfdonutchartDirective } from "../../../ld-dashboard/directives/halfdonutchart.directive";

describe('TimespentComponent', () => {
  let component: TimespentComponent;
  let fixture: ComponentFixture<TimespentComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimespentComponent, HalfdonutchartDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimespentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
