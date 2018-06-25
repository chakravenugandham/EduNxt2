import { Component, OnInit } from "@angular/core";

import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-content-consumption-fullview",
  templateUrl: "./content-consumption-fullview.component.html",
  styleUrls: ["./content-consumption-fullview.component.scss"]
})
export class ContentConsumptionFullviewComponent implements OnInit {
  contentData = [];
  constructor(private contentService: LdDashboardService) {
    this.contentService.refreshAPI.subscribe((result) => {
      this.getDataFromService();
    })
  }

  getDataFromService() {
    this.contentService.getContentData().subscribe((res: any) => {
      this.contentData = res.data;
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
