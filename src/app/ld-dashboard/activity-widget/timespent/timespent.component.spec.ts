import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimespentComponent } from './timespent.component';

describe('TimespentComponent', () => {
  let component: TimespentComponent;
  let fixture: ComponentFixture<TimespentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimespentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimespentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
