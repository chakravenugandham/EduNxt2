import { Component, OnInit } from "@angular/core";
import { GoogleChartsBaseService } from "../../services/googleChartService";
import { LdDashboardService } from "../../services/ld-dashboard.service";

import * as d3 from "d3v4";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"]
})
export class LocationComponent implements OnInit {

  //variable declarations
  someData = [
    ["Location", "learnerCount"],
    // ["Andhra Pradesh", 49386799],
    // ["Karnataka", 61130704],
    // ["Madhya Pradesh", 72597565],
    // ["Uttar Pradesh", 199581477],
    // ["Maharashtra", 112372972],
    // ["Bihar", 103804637],
    // ["Kerala", 33387677],
    // ["Jharkhand", 32966238],
    // ["Assam", 31169272],
    //["Tripura", 3671032],["Meghalaya", 2964007],["Manipur", 2721756],["Nagaland", 1980602],["Goa", 1457723],["Arunachal Pradesh", 1382611],["Mizoram", 1091014],["Sikkim", 607688],["Delhi", 16753235],["Puducherry", 1244464],["Chandigarh", 1054686],["Andaman and Nicobar Islands", 379944],["Dadra and Nagar Haveli", 342853],["Daman and Diu", 242911],["Lakshadweep", 64429],["Gujarat", 60383628],["Andhra Pradesh", 49386799],["Odisha", 41947358],["Telangana", 35286757],["Punjab", 27704236],["Chhattisgarh", 25540196],["Haryana", 25353081],["Jammu and Kashmir", 12548926],["Uttarakhand", 10116752],["Himachal Pradesh", 6856509],["West Bengal", 91347736],["Madhya Pradesh", 72597565],["Tamil Nadu", 72138958],["Rajasthan", 68621012],["Karnataka", 61130704]
  ];

  // [["Tripura", 3671032],["Meghalaya", 2964007],["Manipur", 2721756],["Nagaland", 1980602],["Goa", 1457723],["Arunachal Pradesh", 1382611],["Mizoram", 1091014],["Sikkim", 607688],["Delhi", 16753235],["Puducherry", 1244464],["Chandigarh", 1054686],["Andaman and Nicobar Islands", 379944],["Dadra and Nagar Haveli", 342853],["Daman and Diu", 242911],["Lakshadweep", 64429]],["Gujarat", 60383628],["Andhra Pradesh", 49386799],["Odisha", 41947358],["Telangana", 35286757],["Punjab", 27704236],["Chhattisgarh", 25540196],["Haryana", 25353081],["Jammu and Kashmir", 12548926],["Uttarakhand", 10116752],["Himachal Pradesh", 6856509],["West Bengal", 91347736],["Madhya Pradesh", 72597565],["Tamil Nadu", 72138958],["Rajasthan", 68621012],["Karnataka", 61130704]]

  data = [];
  totalActiveUsers: number;

  responseData = [];
  parseFloat = parseFloat;

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(private googleChartsBaseService: GoogleChartsBaseService, private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getLocationData();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getLocationData();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getLocationData();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getLocationData();
    });
  }

  getLocationData() {
    this.spinner_loader = true;
    this.someData = [["Location", "learnerCount"]];
    this.dashboardService.getLocationData().subscribe((response: any) => {
      this.responseData = response.data;
      this.spinner_loader = false;
      this.noDataFlag = this.responseData.length > 0 ? false : true;
      if (this.responseData.length > 0) {
        for (let i in this.responseData) {
          this.someData.push([
            this.responseData[i]['location'],
            +(this.responseData[i]['learnerCount'])
          ]);
        }

        this.googleChartsBaseService.setMap(this.someData);
      }
      else if (this.responseData.length == 0) {
        d3.select("#regions_div svg").remove();
      }

    });
  }

  ngOnInit() {
    this.getLocationData();
  }
}
