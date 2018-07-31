import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-org-interest-widget",
  templateUrl: "./org-interest-widget.component.html",
  styleUrls: ["./org-interest-widget.component.scss"]
})
export class OrgInterestWidgetComponent implements OnInit {
  routePath: string = "orgInterestFullView";
  filtersData = {
    routeTo: "orgInterestFullView",
    filters: false,
    search: false,
    viewDetails: true,
    filterList: []
  };

  searchFilterData = {
    searchComponent: "organization-interests",
    searchBy: "courseName"
  };
  orgData = {};
  filterbody = {};
  orgPopularTopicData = {};

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getFilterObject($event) {
    this.filterbody = $event;
  }

  getDataFromService() {
    this.dashboardService.getOrgInterestData().subscribe((res: any) => {
      this.orgData = res.data;
    });

    this.dashboardService.getOrgPopulatTopicsData().subscribe((response: any) => {
      this.orgPopularTopicData = response.data;
    })
  }

  ngOnInit() {
    this.getDataFromService();
  }

}
