import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  filterbodyDetails = {};
  orgPerformanceData = {};
  constructor() { }

  dropdown$ = new Subject<any>();

  get dropdownAPI() {
    return this.dropdown$.asObservable();
  }


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
