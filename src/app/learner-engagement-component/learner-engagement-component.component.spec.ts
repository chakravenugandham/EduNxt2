import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerEngagementComponentComponent } from './learner-engagement-component.component';

describe('LearnerEngagementComponentComponent', () => {
  let component: LearnerEngagementComponentComponent;
  let fixture: ComponentFixture<LearnerEngagementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerEngagementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerEngagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
