import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { CloudData, CloudOptions } from "angular-tag-cloud-module";
import { By } from "@angular/platform-browser";

import { OrgInterestComponent } from './org-interest.component';
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

describe('OrgInterestComponent', () => {
  let component: OrgInterestComponent;
  let fixture: ComponentFixture<OrgInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgInterestComponent],
      providers: [LdDashboardService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
