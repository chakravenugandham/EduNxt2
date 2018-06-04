import { Component, OnInit } from '@angular/core';

import { LdDashboardService } from "./services/ld-dashboard.service";

@Component({
  selector: 'app-ld-dashboard',
  templateUrl: './ld-dashboard.component.html',
  styleUrls: ['./ld-dashboard.component.scss']
})
export class LdDashboardComponent implements OnInit {
  filtersList = [];
  constructor( private filterService: LdDashboardService ) { }

  getFilters(){
    // this.filterService.getZoneFilters()
    // .subscribe(
    //   (response:any) => {
    //     //this.filtersList.push(response.data);
    //     this.filtersList = response.data;
    //     console.log("filtersList",this.filtersList);
    //   }
    // );
  }
  ngOnInit() {
    this.getFilters();
  }
}
