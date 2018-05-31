import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: 'app-org-interest',
  templateUrl: './org-interest.component.html',
  styleUrls: ['./org-interest.component.scss']
})
export class OrgInterestComponent implements OnInit {
  orgData = [];
  constructor(private getData: LdDashboardService) { }

  getDataFromService() {
    this.getData.getOrgInterestData().subscribe((res: any) => {
      this.orgData = res.data;
    });
  }
  ngOnInit() {
    this.getDataFromService()

  }

}
