import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerProgressComponent } from './learner-progress.component';

describe('LearnerProgressComponent', () => {
  let component: LearnerProgressComponent;
  let fixture: ComponentFixture<LearnerProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
