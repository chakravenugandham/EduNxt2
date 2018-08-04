import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPerformanceWidgetComponent } from './notification-performance-widget.component';

import { LdDashboardService } from "../services/ld-dashboard.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterWidgetComponent } from "../common/filter-widget/filter-widget.component";
import { BarChartDirective } from "../../ld-dashboard/directives/bar-chart.directive";
import { ScheduledDeliveredComponent } from "./scheduled-delivered/scheduled-delivered.component";
import { SeenRespondedComponent } from "./seen-responded/seen-responded.component";

describe('NotificationPerformanceComponent', () => {
  let component: NotificationPerformanceWidgetComponent;
  let fixture: ComponentFixture<NotificationPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationPerformanceWidgetComponent, FilterWidgetComponent, BarChartDirective,
        ScheduledDeliveredComponent, SeenRespondedComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPerformanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create scheduledFn', () => {
    component.scheduledFn();
    expect(component.scheduledFn).toBeTruthy();
  });

  it('should create seenFn', () => {
    component.seenFn();
    expect(component.seenFn).toBeTruthy();
  });


});
