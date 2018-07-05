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
  }

  get dateFilterBodyDetails() {
    return this.dateObj;
  }
}
