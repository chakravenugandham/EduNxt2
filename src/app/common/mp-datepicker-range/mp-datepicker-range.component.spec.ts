import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DaterangePickerComponent } from "ng2-daterangepicker";

import { MpDatepickerRangeComponent } from './mp-datepicker-range.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { DateserviceService } from "../../common-services/dateservice.service";


describe('MpDatepickerRangeComponent', () => {
  let component: MpDatepickerRangeComponent;
  let fixture: ComponentFixture<MpDatepickerRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MpDatepickerRangeComponent, DaterangePickerComponent],
      providers: [LdDashboardService, DateserviceService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpDatepickerRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  component.options = {};

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
