import { Component, OnInit } from '@angular/core';
import { observable } from "rxjs";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: 'app-org-interest-fullview',
  templateUrl: './org-interest-fullview.component.html',
  styleUrls: ['./org-interest-fullview.component.scss']
})
export class OrgInterestFullviewComponent implements OnInit {
  responseData = [];

  componentName: string = "teams";

  displayFor = {}
  getDisplayObject($event) {
    this.displayFor = $event;
    console.log("this.displayFor", this.displayFor);
  }

  constructor(private getData: LdDashboardService) { }

  getDataFromService() {
    this.getData.getOrgInterestDetails(this.componentName, this.displayFor).subscribe((response: any) => {
      this.responseData = response.data;
    })
  }

  ngOnInit() {
    this.getDataFromService();
  }

}
