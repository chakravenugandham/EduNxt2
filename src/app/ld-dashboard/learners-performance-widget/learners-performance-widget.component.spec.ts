import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnersPerformanceWidgetComponent } from './learners-performance-widget.component';

describe('LearnersPerformanceWidgetComponent', () => {
  let component: LearnersPerformanceWidgetComponent;
  let fixture: ComponentFixture<LearnersPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnersPerformanceWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnersPerformanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
