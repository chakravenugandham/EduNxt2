import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { OrgInterestWidgetComponent } from './org-interest-widget.component';
import { OrgInterestComponent } from "./org-interest/org-interest.component";
import { FilterWidgetComponent } from "../shared/filter-widget/filter-widget.component";

describe('OrgInterestWidgetComponent', () => {
  let component: OrgInterestWidgetComponent;
  let fixture: ComponentFixture<OrgInterestWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgInterestWidgetComponent, OrgInterestComponent, FilterWidgetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgInterestWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
