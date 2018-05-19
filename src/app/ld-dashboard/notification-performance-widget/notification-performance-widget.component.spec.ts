import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPerformanceComponent } from './notification-performance.component';

describe('NotificationPerformanceComponent', () => {
  let component: NotificationPerformanceComponent;
  let fixture: ComponentFixture<NotificationPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
