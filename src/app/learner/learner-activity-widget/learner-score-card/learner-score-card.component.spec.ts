import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerScoreCardComponent } from './learner-score-card.component';

describe('LearnerScoreCardComponent', () => {
  let component: LearnerScoreCardComponent;
  let fixture: ComponentFixture<LearnerScoreCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerScoreCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
