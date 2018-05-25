import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpDatepickerRangeComponent } from './mp-datepicker-range.component';

describe('MpDatepickerRangeComponent', () => {
  let component: MpDatepickerRangeComponent;
  let fixture: ComponentFixture<MpDatepickerRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpDatepickerRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpDatepickerRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
