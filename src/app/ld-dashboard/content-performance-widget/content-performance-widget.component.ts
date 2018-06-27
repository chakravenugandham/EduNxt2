import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-content-performance-widget",
  templateUrl: "./content-performance-widget.component.html",
  styleUrls: ["./content-performance-widget.component.scss"]
})
export class ContentPerformanceWidgetComponent implements OnInit {
  routePath: string = "contentConsumptionFullView";
  filtersData = {
    routeTo: "contentConsumptionFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["contentType"]
  };
  contentData = [];
  getDataFromService() {
    this.contentService.getContentData().subscribe((res: any) => {
      this.contentData = res.data;
    });
  }
  constructor(private contentService: LdDashboardService) {
    this.contentService.refreshAPI.subscribe((result) => {
      this.getDataFromService();
    })
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
