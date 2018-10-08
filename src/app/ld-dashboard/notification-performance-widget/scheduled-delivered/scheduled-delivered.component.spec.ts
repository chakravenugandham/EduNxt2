import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledDeliveredComponent } from './scheduled-delivered.component';
import { BarChartDirective } from "../../../directives/bar-chart.directive";

describe('ScheduledDeliveredComponent', () => {
  let component: ScheduledDeliveredComponent;
  let fixture: ComponentFixture<ScheduledDeliveredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduledDeliveredComponent, BarChartDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledDeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
