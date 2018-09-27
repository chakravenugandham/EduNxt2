import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { OrgPerformanceFullviewComponent } from './org-performance-fullview.component';
import { CookieService } from 'ngx-cookie-service';
import { LdDashboardService } from '../../services/ld-dashboard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterWidgetComponent } from "../../../common/filter-widget/filter-widget.component";
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { PaginateComponent } from "../../../common/paginate/paginate.component";
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

fdescribe('OrgPerformanceFullviewComponent', () => {
  let component: OrgPerformanceFullviewComponent;
  let fixture: ComponentFixture<OrgPerformanceFullviewComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgPerformanceFullviewComponent, , FilterWidgetComponent, SpinnerComponent, CustomNumberPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [HttpClientTestingModule, FormsModule, ClickOutsideModule, NgbModule.forRoot(), RouterModule.forRoot([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPerformanceFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create sortByFn', () => {
    let sortByName = '';
    component.sortByFn(sortByName);
    expect(component.sortByFn).toBeTruthy();
  });
});
