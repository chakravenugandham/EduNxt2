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
import { TextTransformPipe } from '../../../../app/shared/text-transform.pipe';
import { PaginateComponent } from "../../../common/paginate/paginate.component";
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('OrgPerformanceFullviewComponent', () => {
  let component: OrgPerformanceFullviewComponent;
  let fixture: ComponentFixture<OrgPerformanceFullviewComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgPerformanceFullviewComponent, FilterWidgetComponent, SpinnerComponent, CustomNumberPipe, TextTransformPipe, PaginateComponent],
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
    expect(component.sortOrder).toBe(sortByName);
    expect(component.order).toBe('asc');
  });


  it('should create getDataFromService', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeTruthy();
  });

  it('should create setConfigObj', () => {
    component.setConfigObj();
    expect(component.setConfigObj).toBeTruthy();
  });

  it('should create gotoPage', () => {
    let $event;
    component.gotoPage($event);
    expect(component.gotoPage).toBeTruthy();
  });

  it('should create searchItem', () => {
    component.searchItem();
    expect(component.searchItem).toBeTruthy();
  });

  it('should create selectToCompare', () => {
    let user;
    component.selectToCompare(user);
    expect(component.selectToCompare).toBeTruthy();
  });

  it('should create clearSelected', () => {
    component.clearSelected();
    expect(component.clearSelected).toBeTruthy();
  });

  it('should create checkItemInApplied', () => {
    let item;
    component.checkItemInApplied(item);
    expect(component.checkItemInApplied).toBeTruthy();
  });

  it('should create compareSelected', () => {
    component.compareSelected();
    expect(component.compareSelected).toBeTruthy();
  });

  it('should create changeData', () => {
    let item;
    component.changeData(item);
    expect(component.changeData).toBeTruthy();
  });

  it('should create open', () => {
    let content, type, personId;
    component.open(content, type, personId);
    expect(component.open).toBeTruthy();
  });

  it('should create composeEmail', () => {
    let type, personId;
    component.composeEmail(type, personId);
    expect(component.composeEmail).toBeTruthy();
  });

});
