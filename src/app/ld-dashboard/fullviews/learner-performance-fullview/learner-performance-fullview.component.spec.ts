import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnerPerformanceFullviewComponent } from './learner-performance-fullview.component';
import { PerformanceComponent } from "../../learners-performance-widget/performance/performance.component";
import { ProgressComponent } from "../../learners-performance-widget/progress/progress.component";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClickOutsideModule } from 'ng4-click-outside';
import { FilterWidgetComponent } from "../../../common/filter-widget/filter-widget.component";
import { GraphChartComponent } from '../../../common/graph-chart/graph-chart.component';
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { FormsModule } from '@angular/forms';
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../../app/shared/text-transform.pipe';
import { CookieService } from 'ngx-cookie-service';
import { PaginateComponent } from "../../../common/paginate/paginate.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';

describe('LearnerPerformanceFullviewComponent', () => {
  let component: LearnerPerformanceFullviewComponent;
  let fixture: ComponentFixture<LearnerPerformanceFullviewComponent>;
  //let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerPerformanceFullviewComponent, PerformanceComponent, ProgressComponent, FilterWidgetComponent, GraphChartComponent, SpinnerComponent, PaginateComponent, CustomNumberPipe, TextTransformPipe],
      providers: [LdDashboardService, CookieService, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [HttpClientTestingModule, ClickOutsideModule, NgbModule.forRoot(), RouterModule.forRoot([]), FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerPerformanceFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create getDataFromService', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeTruthy();
  });

  it('should create onchange', () => {
    let componentName;
    component.onchange(componentName);
    expect(component.onchange).toBeTruthy();
  });

  it('should create getDataForGraph', () => {
    component.getDataForGraph();
    expect(component.getDataForGraph).toBeTruthy();
  });

  it('should create getFilterObject', () => {
    let $event;
    component.getFilterObject($event);
    expect(component.getFilterObject).toBeTruthy();
  });

});
