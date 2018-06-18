import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { LdDashboardService } from "../services/ld-dashboard.service";

import { ActiveUserWidgetComponent } from './active-user-widget.component';

fdescribe('ActiveUserWidgetComponent', () => {
  let component: ActiveUserWidgetComponent;
  let fixture: ComponentFixture<ActiveUserWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveUserWidgetComponent],
      providers: [LdDashboardService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUserWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
