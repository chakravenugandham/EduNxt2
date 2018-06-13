import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPerformanceWidgetComponent } from './notification-performance-widget.component';

describe('NotificationPerformanceComponent', () => {
  let component: NotificationPerformanceWidgetComponent;
  let fixture: ComponentFixture<NotificationPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationPerformanceWidgetComponent]
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
});
