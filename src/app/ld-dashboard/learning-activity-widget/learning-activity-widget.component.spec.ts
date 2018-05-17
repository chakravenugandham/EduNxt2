import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningActivityWidgetComponent } from './learning-activity-widget.component';

describe('LearningActivityWidgetComponent', () => {
  let component: LearningActivityWidgetComponent;
  let fixture: ComponentFixture<LearningActivityWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningActivityWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningActivityWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
