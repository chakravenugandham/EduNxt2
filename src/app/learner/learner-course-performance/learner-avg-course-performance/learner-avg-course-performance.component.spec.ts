import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerAvgCoursePerformanceComponent } from './learner-avg-course-performance.component';

describe('LearnerAvgCoursePerformanceComponent', () => {
  let component: LearnerAvgCoursePerformanceComponent;
  let fixture: ComponentFixture<LearnerAvgCoursePerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerAvgCoursePerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerAvgCoursePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
