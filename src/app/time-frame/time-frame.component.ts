import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-time-frame',
  templateUrl: './time-frame.component.html',
  styleUrls: ['./time-frame.component.scss']
})
export class TimeFrameComponent implements OnInit {

  today: Date = new Date();

  constructor() { }

  ngOnInit() {
    // $(document).ready(function () {
    // $('input[name="daterange"]').daterangepicker({
    //   opens: 'left'
    // }, function (start, end, label) {
    //   console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    // });
    //});
  }

}
