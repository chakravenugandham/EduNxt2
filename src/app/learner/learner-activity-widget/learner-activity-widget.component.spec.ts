import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerActivityWidgetComponent } from './learner-activity-widget.component';

describe('LearnerActivityWidgetComponent', () => {
  let component: LearnerActivityWidgetComponent;
  let fixture: ComponentFixture<LearnerActivityWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerActivityWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerActivityWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
