import { Component, OnInit } from '@angular/core';
import { observable } from "rxjs";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: 'app-org-interest-fullview',
  templateUrl: './org-interest-fullview.component.html',
  styleUrls: ['./org-interest-fullview.component.scss']
})
export class OrgInterestFullviewComponent implements OnInit {
  //global variable declarations
  responseData = [];

  componentName: string = "teams";

  //dropdown display values
  displayFor = {}
  getDisplayObject($event) {
    this.displayFor = $event;
  }

  constructor(private getData: LdDashboardService) { }

  //api call for orgDetails based on component
  getDataFromService() {
    this.getData.getOrgInterestDetails(this.componentName, this.displayFor).subscribe((response: any) => {
      this.responseData = response.data;
    })
  }

  ngOnInit() {
    this.getDataFromService();
  }

}
