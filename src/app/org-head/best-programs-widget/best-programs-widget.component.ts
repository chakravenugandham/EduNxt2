import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-best-programs-widget",
  templateUrl: "./best-programs-widget.component.html",
  styleUrls: ["./best-programs-widget.component.scss"]
})
export class BestProgramsWidgetComponent implements OnInit {
  filtersData = {
    routeTo: "bestProgramsFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["program"],
    viewDetailsFilters: false
  };

  responseData = {};
  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.dashboardService.getBestPrograms().subscribe((response: any) => {
      this.responseData = response.data;
    });
  }

  ngOnInit() {
    //this.getDataFromService();
  }
}
