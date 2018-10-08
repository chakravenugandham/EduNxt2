import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPerformanceFullviewComponent } from './notification-performance-fullview.component';
import { ScheduledDeliveredComponent } from "../../notification-performance-widget/scheduled-delivered/scheduled-delivered.component";
import { SeenRespondedComponent } from "../../notification-performance-widget/seen-responded/seen-responded.component";
import { BarChartDirective } from "../../../directives/bar-chart.directive";

describe('NotificationPerformanceFullviewComponent', () => {
  let component: NotificationPerformanceFullviewComponent;
  let fixture: ComponentFixture<NotificationPerformanceFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationPerformanceFullviewComponent, ScheduledDeliveredComponent,
        SeenRespondedComponent, BarChartDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPerformanceFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
