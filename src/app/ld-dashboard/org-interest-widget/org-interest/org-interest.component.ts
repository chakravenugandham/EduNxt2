import { Component, OnInit } from '@angular/core';
import { OrgInterestService } from "../../../ld-dashboard/services/org-interest.service";

@Component({
  selector: 'app-org-interest',
  templateUrl: './org-interest.component.html',
  styleUrls: ['./org-interest.component.scss']
})
export class OrgInterestComponent implements OnInit {
  orgData = [];
  constructor(private orgInterestService: OrgInterestService) { }

  getDataFromService() {
    this.orgInterestService.getData().subscribe((res: any) => {
      this.orgData = res.data;
      console.log("org interest data", this.orgData);
    });
  }
  ngOnInit() {
    this.getDataFromService()

  }

}
