import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  filterbodyDetails = {};

  constructor() { }

  set learnerFilterBodyDetails(data) {
    this.filterbodyDetails = data;
  }

  get learnerFilterBodyDetails() {
    return this.filterbodyDetails;
  }

}
