import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerTimeSpentComponent } from './learner-time-spent.component';

describe('LearnerTimeSpentComponent', () => {
  let component: LearnerTimeSpentComponent;
  let fixture: ComponentFixture<LearnerTimeSpentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerTimeSpentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerTimeSpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
