import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpDatepickerRangeComponent } from './mp-datepicker-range.component';
import { Daterangepicker } from 'ng2-daterangepicker';
//import { DaterangePickerComponent } from "ng2-daterangepicker";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { DateserviceService } from "../../common-services/dateservice.service";
import { CookieService } from 'ngx-cookie-service';

describe('MpDatepickerRangeComponent', () => {
  let service: LdDashboardService;
  let component: MpDatepickerRangeComponent;
  let fixture: ComponentFixture<MpDatepickerRangeComponent>;

  // let daterange: any = {
  //   start: this.dateTest.start_date,
  //   end: this.dateTest.end_date,
  //   label: ""
  // };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MpDatepickerRangeComponent],
      providers: [LdDashboardService, DateserviceService, CookieService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([]), Daterangepicker]
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

  it('should create selectedDate', () => {

    let value = {
      start: { _d: new Date() },
      end: { _d: new Date() }
    };
    component.selectedDate(value);
    expect(component.selectedDate).toBeTruthy();
  });


});
