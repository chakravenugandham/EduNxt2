import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { OrgInterestWidgetComponent } from './org-interest-widget.component';
import { OrgInterestComponent } from "./org-interest/org-interest.component";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";
import { TagCloudComponent } from "angular-tag-cloud-module";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrgInterestWidgetComponent', () => {
  let component: OrgInterestWidgetComponent;
  let fixture: ComponentFixture<OrgInterestWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgInterestWidgetComponent, OrgInterestComponent, FilterWidgetComponent, TagCloudComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
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

  // it('should create getFilterObject', () => {
  //   let $event;
  //   component.getFilterObject($event);
  //   expect(component.getFilterObject).toBeTruthy();
  // });
});
