import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { LdDashboardService } from '../../ld-dashboard/services/ld-dashboard.service';
import { DateserviceService } from '../../common-services/dateservice.service';

@Component({
  selector: 'app-mp-datepicker-range',
  templateUrl: './mp-datepicker-range.component.html',
  styleUrls: ['./mp-datepicker-range.component.scss']
})
export class MpDatepickerRangeComponent implements AfterViewInit {
  public date = new Date();

  @ViewChild(DaterangePickerComponent) private picker: DaterangePickerComponent;

  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false
  };
  public applyDate(e: any) { }

  constructor(
    private dashboardService: LdDashboardService,
    private getDateService: DateserviceService
  ) { }

  dateTest = this.dashboardService.constructDate();

  public daterange: any = {
    start: this.dateTest.start_date,
    end: this.dateTest.end_date,
    label: ''
  };

  dateFilterObj = {};

  public selectedDate(value: any) {

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.dateFilterObj['start_date'] = this.daterange.start._d.getMonth() + 1 + '/' + this.daterange.start._d.getDate() + '/' + this.daterange.start._d.getFullYear();

    this.dateFilterObj['end_date'] = this.daterange.end._d.getMonth() + 1 + '/' + this.daterange.end._d.getDate() + '/' + this.daterange.end._d.getFullYear();
    this.getDateService.dateFilterBodyDetails = this.dateFilterObj;
    this.dashboardService.changeDate(this.dateFilterObj);
    this.dashboardService.dateChange$.next(this.dateFilterObj);
  }

  ngAfterViewInit() {
    this.picker.datePicker.setStartDate(new Date(this.daterange.start));
    this.picker.datePicker.setEndDate(new Date(this.daterange.end));
  }
}
