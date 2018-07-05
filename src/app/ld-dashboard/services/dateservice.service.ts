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
    this.constructDate();
  }

  constructDate() {
    let today = new Date();
    this.dateFilterObj.end_date = today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();

    let last_date = new Date(today.setDate(today.getDate() - 30));
    this.dateFilterObj.start_date =
      last_date.getMonth() +
      1 +
      "/" +
      last_date.getDate() +
      "/" +
      last_date.getFullYear();
    return this.dateFilterObj;
  }

  set dateFilterBodyDetails(date) {
    this.dateObj = date;
  }

  get dateFilterBodyDetails() {
    return this.dateObj;
  }
}
