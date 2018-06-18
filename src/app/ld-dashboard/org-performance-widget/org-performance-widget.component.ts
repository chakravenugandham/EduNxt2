import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-org-performance-widget",
  templateUrl: "./org-performance-widget.component.html",
  styleUrls: ["./org-performance-widget.component.scss"]
})
export class OrgPerformanceWidgetComponent implements OnInit {
  // routePath: string = "orgPerformanceFullView";
  getTab: string = "teams";

  filtersData = {
    routeTo: "orgPerformanceFullView",
    filters: true,
    search: false,
    viewDetails: true,
    filterList: ["zone"],
    currentModule: this.getTab
  };

  responseData:any;

  filterbody = {};

  constructor(private serviceData: LdDashboardService) {}

  teamsFn() {
    this.getTab = "teams";
  }
  trainersFn() {
    this.getTab = "trainers";
  }
  learnersFn() {
    this.getTab = "learner";
  }

  getData() {
    this.serviceData
      .getScoresDistrubution(this.getTab, this.filterbody)
      .subscribe((response: any) => {
        this.responseData = response.data;
      });
  }
  
  getFilterObject($event) {
    this.filterbody = $event;
    // this.();
    console.log("this.filterbody", this.filterbody);
  }

  ngOnInit() {}
}
