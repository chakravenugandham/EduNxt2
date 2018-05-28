import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerPerformanceFullviewComponent } from './learner-performance-fullview.component';

describe('LearnerPerformanceFullviewComponent', () => {
  let component: LearnerPerformanceFullviewComponent;
  let fixture: ComponentFixture<LearnerPerformanceFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerPerformanceFullviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerPerformanceFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
