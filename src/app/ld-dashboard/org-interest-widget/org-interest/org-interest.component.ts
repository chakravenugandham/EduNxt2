import { Component, OnInit } from "@angular/core";
import { CloudData, CloudOptions } from "angular-tag-cloud-module";

import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-org-interest",
  templateUrl: "./org-interest.component.html",
  styleUrls: ["./org-interest.component.scss"]
})
export class OrgInterestComponent implements OnInit {
  orgData = [];

  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width: 300,
    height: 200,
    overflow: false
  };

  data: CloudData[] = [
    {
      text: "Weight-8-link-color",
      weight: 8,
      link: "https://google.com",
      color: "#ffaaee"
    },
    {
      text: "Weight-8-link-color",
      weight: 8,
      link: "https://google.com",
      color: "#ffaaee"
    },
    {
      text: "Weight-8-link-color",
      weight: 8,
      link: "https://google.com",
      color: "#ffaaee"
    },
    {
      text: "Weight-8-link-color",
      weight: 8,
      link: "https://google.com",
      color: "#ffaaee"
    }
  ];

  constructor(private getData: LdDashboardService) {}

  getDataFromService() {
    this.getData.getOrgInterestData().subscribe((res: any) => {
      this.orgData = res.data;
    });
  }
  ngOnInit() {
    this.getDataFromService();
  }
}
