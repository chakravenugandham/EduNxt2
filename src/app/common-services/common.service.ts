import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  filterbodyDetails = {};
  constructor() { }

  set learnerFilterBodyDetails(data) {
    this.filterbodyDetails = data;
    console.log(this.filterbodyDetails);

  }

  get learnerFilterBodyDetails() {
    return this.filterbodyDetails;
  }
}
