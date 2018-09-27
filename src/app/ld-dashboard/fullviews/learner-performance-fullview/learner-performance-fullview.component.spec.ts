import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnerPerformanceFullviewComponent } from './learner-performance-fullview.component';
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { PerformanceComponent } from "../../learners-performance-widget/performance/performance.component";
import { ProgressComponent } from "../../learners-performance-widget/progress/progress.component";
import { BarChartDirective } from "../../../ld-dashboard/directives/bar-chart.directive";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaginateComponent } from "../../../common/paginate/paginate.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('LearnerPerformanceFullviewComponent', () => {
  let component: LearnerPerformanceFullviewComponent;
  let fixture: ComponentFixture<LearnerPerformanceFullviewComponent>;
  //let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerPerformanceFullviewComponent, PerformanceComponent, ProgressComponent, BarChartDirective, PaginateComponent],
      providers: [LdDashboardService, { provide: APP_BASE_HREF, useValue: '/' }, CookieService],
      imports: [HttpClientTestingModule, NgbModule.forRoot(), RouterModule.forRoot([]), FormsModule]
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

  // it('should create getDataFromService', () => {
  //   component.getDataFromService();
  //   expect(component.getDataFromService).toBeTruthy();
  // });


});
