import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { OrgPerformanceWidgetComponent } from './org-performance-widget.component';
import { LdDashboardService } from "../services/ld-dashboard.service";
import { TeamsComponent } from "./teams/teams.component";
import { TrainersComponent } from "./trainers/trainers.component";
import { LearnersComponent } from "./learners/learners.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";
import { ClickOutsideModule } from 'ng4-click-outside';
import { SpinnerComponent } from "../../common/spinner/spinner.component";
import { CustomNumberPipe } from "../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../app/shared/text-transform.pipe';
import { CookieService } from 'ngx-cookie-service';
import { PaginateComponent } from "../../common/paginate/paginate.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('OrgPerformanceComponent', () => {
  let component: OrgPerformanceWidgetComponent;
  let fixture: ComponentFixture<OrgPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgPerformanceWidgetComponent, TeamsComponent, TrainersComponent, LearnersComponent, FilterWidgetComponent, SpinnerComponent, CustomNumberPipe, TextTransformPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [HttpClientTestingModule, FormsModule, ClickOutsideModule, NgbModule.forRoot(), RouterModule.forRoot([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPerformanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create teamsFn', () => {
    component.teamsFn();
    expect(component.teamsFn).toBeTruthy();
  });

  it('should create trainersFn', () => {
    component.trainersFn();
    expect(component.trainersFn).toBeTruthy();
  });

  it('should create learnersFn', () => {
    component.learnersFn();
    expect(component.learnersFn).toBeTruthy();
  });

  it('should create getData', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeTruthy();
  });

  it('should create sortByFn asc', () => {
    let $event = 'testPerformance';
    component.sortBy($event);
    expect(component.sortOrder).toBe($event);
    expect(component.order).toBe('asc');
  });

  it('should create sortByFn desc', () => {
    let $event = 'testPerformance';
    component.order = 'asc';
    component.sortBy($event);
    expect(component.sortOrder).toBe($event);
    expect(component.order).toBe('desc');
  });

  it('should create constructNewArrayTwo', () => {
    component.constructNewArrayTwo();
    expect(component.constructNewArrayTwo).toBeTruthy();
  });

  it('should create constructNewArray', () => {
    component.constructNewArray();
    expect(component.constructNewArray).toBeTruthy();
  });

  it('should create getSearchItem', () => {
    let $event;
    component.getSearchItem($event);
    expect(component.getSearchItem).toBeTruthy();
  });

});

