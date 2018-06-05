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

  constructor(private getData: LdDashboardService) { }

  getDataFromService() {
    this.getData.getOrgInterestDetails().subscribe((response: any) => {
      this.responseData = response.data;
    })
  }

  ngOnInit() {
    this.getDataFromService();
  }

}
