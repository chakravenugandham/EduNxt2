import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpDatepickerRangeComponent } from './mp-datepicker-range.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


fdescribe('MpDatepickerRangeComponent', () => {
  let component: MpDatepickerRangeComponent;
  let fixture: ComponentFixture<MpDatepickerRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MpDatepickerRangeComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
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
