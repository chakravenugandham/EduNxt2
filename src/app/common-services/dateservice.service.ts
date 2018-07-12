import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateserviceService {

  dateObj = {};

  dateFilterObj = {
    start_date: "",
    end_date: ""
  };

  constructor() {
  }

  set dateFilterBodyDetails(date) {
    this.dateObj = date;
  }

  get dateFilterBodyDetails() {
    return this.dateObj;
  }
}
