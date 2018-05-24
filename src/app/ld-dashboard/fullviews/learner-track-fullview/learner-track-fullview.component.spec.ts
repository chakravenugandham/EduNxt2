import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerTrackFullviewComponent } from './learner-track-fullview.component';

describe('LearnerTrackFullviewComponent', () => {
  let component: LearnerTrackFullviewComponent;
  let fixture: ComponentFixture<LearnerTrackFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerTrackFullviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerTrackFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
