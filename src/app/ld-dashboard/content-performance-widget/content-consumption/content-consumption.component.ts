import { Component, OnInit } from "@angular/core";

import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-content-consumption",
  templateUrl: "./content-consumption.component.html",
  styleUrls: ["./content-consumption.component.scss"]
})
export class ContentConsumptionComponent implements OnInit {
  contentData = [];
  constructor(private contentService: LdDashboardService) { }
  getDataFromService() {
    this.contentService.getContentData().subscribe((res: any) => {
      this.contentData = res.data;
    });
  }
  ngOnInit() {
    this.getDataFromService();
  }
}
