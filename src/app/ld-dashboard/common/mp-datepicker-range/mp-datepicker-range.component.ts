import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { DaterangePickerComponent } from "ng2-daterangepicker";

@Component({
  selector: "app-mp-datepicker-range",
  templateUrl: "./mp-datepicker-range.component.html",
  styleUrls: ["./mp-datepicker-range.component.scss"]
})
export class MpDatepickerRangeComponent implements AfterViewInit {
  public date = new Date();
  public daterange: any = {
    start: Date.now(),
    end: Date.now(),
    label: ""
  };

  @ViewChild(DaterangePickerComponent) private picker: DaterangePickerComponent;

  public options: any = {
    locale: { format: "YYYY-MM-DD" },
    alwaysShowCalendars: false
  };
  public applyDate(e: any) { }

  constructor() { }

  public selectedDate(value: any) {
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    console.log(this.daterange.start, this.daterange.end);
    console.log("value", value);
  }

  ngAfterViewInit() {
    this.picker.datePicker.setStartDate(this.date);
    console.log(this.date);
  }
}
