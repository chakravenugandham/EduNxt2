import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnersPerformanceWidgetComponent } from './learners-performance-widget.component';
import { LdDashboardService } from "../services/ld-dashboard.service";
import { PerformanceComponent } from "./performance/performance.component";
import { ProgressComponent } from "./progress/progress.component";
import { BarChartDirective } from "../../ld-dashboard/directives/bar-chart.directive";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { CustomNumberPipe } from "../../../app/shared/custom-number.pipe";
import { PaginateComponent } from '../../common/paginate/paginate.component';
import { CookieService } from 'ngx-cookie-service';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

fdescribe('LearnersPerformanceWidgetComponent', () => {
  let component: LearnersPerformanceWidgetComponent;
  let fixture: ComponentFixture<LearnersPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnersPerformanceWidgetComponent, PerformanceComponent, ProgressComponent, BarChartDirective, FilterWidgetComponent, SpinnerComponent, CustomNumberPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([]), ClickOutsideModule, NgbModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnersPerformanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create performanceFn', () => {
    component.performanceFn();
    expect(component.performanceFn).toBeTruthy();
  });

  it('should create progressFn', () => {
    component.progressFn();
    expect(component.progressFn).toBeTruthy();
  });

  it('should create getFilterObject', () => {
    let $event;
    component.getFilterObject($event);
    expect(component.getFilterObject).toBeTruthy();
  });

  it('should create getDataFromService', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeTruthy();
  });

});
