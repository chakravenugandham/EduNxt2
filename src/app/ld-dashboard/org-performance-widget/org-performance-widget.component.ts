import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";

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
    search: true,
    viewDetails: true,
    filterList: ["zone"],
    currentModule: this.getTab
  };

  responseData: any;

  filterbody = {};

  constructor(private serviceData: LdDashboardService) {
    this.serviceData.refreshAPI.subscribe((result) => {
      this.getDataFromService();
    });

    this.serviceData.dateChange.subscribe(result => {
      this.getDataFromService();
    });
  }

  teamsFn() {
    this.getTab = "teams";
  }
  trainersFn() {
    this.getTab = "trainers";
  }
  learnersFn() {
    this.getTab = "learner";
  }

  getDataFromService() {
    this.serviceData
      .getScoresDistrubution(this.getTab, this.filterbody)
      .subscribe((response: any) => {
        this.responseData = response.data;
      });
  }

  getFilterObject($event) {
    this.filterbody = $event;
  }

  ngOnInit() { }
}
