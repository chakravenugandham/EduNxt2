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
import { DonutChartDirective } from "../../ld-dashboard/directives/donut-chart.directive";
import { HalfdonutchartDirective } from "../../ld-dashboard/directives/halfdonutchart.directive";
import { Config, UsersDataComponent } from "../../ld-dashboard/common/users-data/users-data.component";
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

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

});
