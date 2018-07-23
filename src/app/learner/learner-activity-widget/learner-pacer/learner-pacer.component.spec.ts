import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerPacerComponent } from './learner-pacer.component';

describe('LearnerPacerComponent', () => {
  let component: LearnerPacerComponent;
  let fixture: ComponentFixture<LearnerPacerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerPacerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerPacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
