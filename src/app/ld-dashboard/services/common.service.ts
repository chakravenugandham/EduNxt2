import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  filterbodyDetails = {};

  dateObj = {};

  constructor() { }

  set learnerFilterBodyDetails(data) {
    this.filterbodyDetails = data;
  }

  get learnerFilterBodyDetails() {
    return this.filterbodyDetails;
  }

  set dateFilterBodyDetails(date) {
    this.dateObj = date;
    console.log('service set done', this.dateObj);
  }

  get dateFilterBodyDetails() {
    console.log(this.dateObj);
    return this.dateObj;
  }
}
