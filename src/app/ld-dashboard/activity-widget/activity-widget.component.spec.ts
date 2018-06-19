import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { ActivityWidgetComponent } from './activity-widget.component';
import { LdDashboardService } from "../services/ld-dashboard.service";
import { EngagementComponent } from "./engagement/engagement.component";
import { PaceComponent } from "./pace/pace.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { TimespentComponent } from "./timespent/timespent.component";
import { UsersComponent } from "./users/users.component";
import { UserstrainedComponent } from "./userstrained/userstrained.component";
import { DonutChartDirective } from "../../directives/donut-chart.directive";
import { HalfdonutchartDirective } from "../../directives/halfdonutchart.directive";
import { Config, UsersDataComponent } from "../../common/users-data/users-data.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


fdescribe('ActivityWidgetComponent', () => {
  let component: ActivityWidgetComponent;
  let fixture: ComponentFixture<ActivityWidgetComponent>;
  let inputEl: DebugElement;

  let responseData = {
    activeUsers: "",
    learnerEngagement: "",
    learnerPace: "",
    feedback: "",

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityWidgetComponent, UsersComponent,
        EngagementComponent, PaceComponent, FeedbackComponent, TimespentComponent,
        UserstrainedComponent, UsersDataComponent, HalfdonutchartDirective, DonutChartDirective],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityWidgetComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getDataFromService should be defined', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeDefined();
  });
});
