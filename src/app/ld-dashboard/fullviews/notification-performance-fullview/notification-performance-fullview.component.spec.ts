import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPerformanceFullviewComponent } from './notification-performance-fullview.component';

describe('NotificationPerformanceFullviewComponent', () => {
  let component: NotificationPerformanceFullviewComponent;
  let fixture: ComponentFixture<NotificationPerformanceFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationPerformanceFullviewComponent ]
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
