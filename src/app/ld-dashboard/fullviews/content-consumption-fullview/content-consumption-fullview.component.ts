import { Component, OnInit } from "@angular/core";

import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-content-consumption-fullview",
  templateUrl: "./content-consumption-fullview.component.html",
  styleUrls: ["./content-consumption-fullview.component.scss"]
})
export class ContentConsumptionFullviewComponent implements OnInit {
  contentData = [];
  filterbody = {};
  filtersData = {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    viewDetails: false,
    filterList: ["batch"],
    viewDetailsFilters: true
  };
  constructor(private contentService: LdDashboardService) {
    this.contentService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
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
