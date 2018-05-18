import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerPeaceComponentComponent } from './learner-peace-component.component';

describe('LearnerPeaceComponentComponent', () => {
  let component: LearnerPeaceComponentComponent;
  let fixture: ComponentFixture<LearnerPeaceComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerPeaceComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerPeaceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
