import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerPaceComponent } from './learner-pace.component';

describe('LearnerPaceComponent', () => {
  let component: LearnerPaceComponent;
  let fixture: ComponentFixture<LearnerPaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerPaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerPaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
