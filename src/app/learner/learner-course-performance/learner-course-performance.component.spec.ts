import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerCoursePerformanceComponent } from './learner-course-performance.component';

describe('LearnerCoursePerformanceComponent', () => {
  let component: LearnerCoursePerformanceComponent;
  let fixture: ComponentFixture<LearnerCoursePerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerCoursePerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerCoursePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
