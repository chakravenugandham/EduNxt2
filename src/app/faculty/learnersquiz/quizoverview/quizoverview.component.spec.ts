import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizoverviewComponent } from './quizoverview.component';

describe('QuizoverviewComponent', () => {
  let component: QuizoverviewComponent;
  let fixture: ComponentFixture<QuizoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
