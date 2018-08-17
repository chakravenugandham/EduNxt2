import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateserviceService {

  dateObj = {};

  constructor() {
  }

  set dateFilterBodyDetails(date) {
    this.dateObj = date;
  }

  get dateFilterBodyDetails() {
    return this.dateObj;
  }
}
