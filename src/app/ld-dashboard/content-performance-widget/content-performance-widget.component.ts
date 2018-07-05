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
    filterList: ["contentType"],
    viewDetailsFilters: false
  };
  filterbody = {};
  contentData = [];

  constructor(private contentService: LdDashboardService) {
    this.contentService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.contentService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    })
  }

  getDataFromService() {
    this.contentService
      .getContentData(this.filterbody)
      .subscribe((res: any) => {
        this.contentData = res.data;
      });
  }

  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
