import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  filterbodyDetails = {};
  orgPerformanceData = {};
  constructor() { }

  set learnerFilterBodyDetails(data) {
    this.filterbodyDetails = data;
  }

  get learnerFilterBodyDetails() {
    return this.filterbodyDetails;
  }

  set orgPerformanceDetails(data) {
    this.orgPerformanceData = data;
  }

  get orgPerformanceDetails() {
    return this.orgPerformanceData;
  }
}
