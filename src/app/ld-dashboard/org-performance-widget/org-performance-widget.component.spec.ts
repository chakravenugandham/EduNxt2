import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { OrgPerformanceWidgetComponent } from './org-performance-widget.component';
import { LdDashboardService } from "../services/ld-dashboard.service";
import { TeamsComponent } from "./teams/teams.component";
import { TrainersComponent } from "./trainers/trainers.component";
import { LearnersComponent } from "./learners/learners.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterWidgetComponent } from "../shared/filter-widget/filter-widget.component";

fdescribe('OrgPerformanceComponent', () => {
  let component: OrgPerformanceWidgetComponent;
  let fixture: ComponentFixture<OrgPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgPerformanceWidgetComponent, TeamsComponent, TrainersComponent, LearnersComponent, FilterWidgetComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
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
});
