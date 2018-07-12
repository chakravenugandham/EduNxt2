import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnersQuizFullviewComponent } from './learners-quiz-fullview.component';

describe('LearnersQuizFullviewComponent', () => {
  let component: LearnersQuizFullviewComponent;
  let fixture: ComponentFixture<LearnersQuizFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnersQuizFullviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnersQuizFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
