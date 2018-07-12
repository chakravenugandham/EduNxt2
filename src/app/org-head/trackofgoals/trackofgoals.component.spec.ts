import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackofgoalsComponent } from './trackofgoals.component';

describe('TrackofgoalsComponent', () => {
  let component: TrackofgoalsComponent;
  let fixture: ComponentFixture<TrackofgoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackofgoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackofgoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
