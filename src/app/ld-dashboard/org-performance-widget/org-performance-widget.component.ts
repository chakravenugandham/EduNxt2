import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { CommonService } from "../../common-services/common.service";

@Component({
  selector: "app-org-performance-widget",
  templateUrl: "./org-performance-widget.component.html",
  styleUrls: ["./org-performance-widget.component.scss"]
})
export class OrgPerformanceWidgetComponent implements OnInit {
  getTab: string = "teams";

  filtersData = {
    routeTo: "orgPerformanceFullView",
    filters: false,
    search: false,
    viewDetails: false,
    filterList: ["zone"],
    currentModule: this.getTab
  };
  filterName = ["batch"];

  responseData: any;

  filterbody = {};

  constructor(
    private dashboardService: LdDashboardService,
    private filterData: CommonService
  ) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  teamsFn() {
    this.getTab = "teams";
    this.filtersData.currentModule = "teams";
    console.log(this.filterData.learnerFilterBodyDetails);
    this.filterData.learnerFilterBodyDetails = this.filtersData;
    console.log(this.filterData.learnerFilterBodyDetails);
  }
  trainersFn() {
    this.getTab = "trainers";
    this.filtersData.currentModule = "trainers";
    this.filterData.learnerFilterBodyDetails = this.filtersData;
  }
  learnersFn() {
    this.getTab = "learner";
    this.filtersData.currentModule = "learner";
    this.filterData.learnerFilterBodyDetails = this.filtersData;
  }

  getDataFromService() {
    this.dashboardService
      .getScoresDistrubution(this.getTab, this.filterbody)
      .subscribe((response: any) => {
        this.responseData = response.data;
      });
  }

  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }

  ngOnInit() {}
}
