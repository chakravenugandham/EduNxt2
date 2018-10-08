import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LearnerTrackFullviewComponent } from './learner-track-fullview.component';
import { LearnerPaceComponent } from "../../learners-track-widget/learner-pace/learner-pace.component";
import { LearnerPerformanceComponent } from "../../learners-track-widget/learner-performance/learner-performance.component";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { DonutChartDirective } from "../../../directives/donut-chart.directive";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilterWidgetComponent } from "../../../common/filter-widget/filter-widget.component";
import { ClickOutsideModule } from 'ng4-click-outside';
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { FormsModule } from '@angular/forms';
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../../app/shared/text-transform.pipe';
import { CookieService } from 'ngx-cookie-service';
import { PaginateComponent } from "../../../common/paginate/paginate.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('LearnerTrackFullviewComponent', () => {
  let component: LearnerTrackFullviewComponent;
  let fixture: ComponentFixture<LearnerTrackFullviewComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerTrackFullviewComponent, LearnerPaceComponent,
        LearnerPerformanceComponent, DonutChartDirective, FilterWidgetComponent, SpinnerComponent, CustomNumberPipe, TextTransformPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [HttpClientTestingModule, FormsModule, ClickOutsideModule, NgbModule.forRoot(), RouterModule.forRoot([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerTrackFullviewComponent);
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

  it('should create getModule', () => {
    component.getModule();
    expect(component.getModule).toBeTruthy();
  });

  it('should create getGraphDataFromService', () => {
    component.getGraphDataFromService();
    expect(component.getGraphDataFromService).toBeTruthy();
  });

  it('should create getTableDataFromService', () => {
    component.getTableDataFromService();
    expect(component.getTableDataFromService).toBeTruthy();
  });

  it('should create checkObjEmpty', () => {
    let obj;
    component.checkObjEmpty(obj);
    expect(component.checkObjEmpty).toBeTruthy();
  });


  it('should create getDisplayObject', () => {
    let $event;
    component.getDisplayObject($event);
    expect(component.getDisplayObject).toBeTruthy();
  });


  it('should create gotoPage', () => {
    let $event;
    component.gotoPage($event);
    expect(component.gotoPage).toBeTruthy();
  });


  it('should create addFilters', () => {
    let $event;
    component.addFilters($event);
    expect(component.addFilters).toBeTruthy();
  });


  it('should create searchItem', () => {
    component.searchItem();
    expect(component.searchItem).toBeTruthy();
  });

});
