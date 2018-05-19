import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerPerformanceComponent } from './learner-performance.component';

describe('LearnerPerformanceComponent', () => {
  let component: LearnerPerformanceComponent;
  let fixture: ComponentFixture<LearnerPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
