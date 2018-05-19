import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnersTrackWidgetComponent } from './learners-track-widget.component';

describe('LearnersTrackWidgetComponent', () => {
  let component: LearnersTrackWidgetComponent;
  let fixture: ComponentFixture<LearnersTrackWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnersTrackWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnersTrackWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
