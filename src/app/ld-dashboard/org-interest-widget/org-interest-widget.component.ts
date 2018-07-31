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
    search: true,
    viewDetails: false,
    filterList: []
  };

  searchFilterData = {
    searchComponent: "organization-interests",
    searchBy: "courseName"
  };

  filterbody = {};
  orgData: any[];
  orgPopularTopicData: any[];
  actualResponseData: any[];

  searchFilterItem = [];

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

  getSearchItem($event) {
    this.searchFilterItem = $event;
    for (let i in this.searchFilterItem) {
      this.searchFilterItem[i]["new"] = true;
    }

    this.orgData = JSON.parse(JSON.stringify(this.actualResponseData));

    if (this.searchFilterItem.length > 0)
      this.orgData.splice(-this.searchFilterItem.length);

    this.orgData = this.orgData.concat(this.searchFilterItem);
  }

  getDataFromService() {
    this.dashboardService.getOrgInterestData().subscribe((res: any) => {
      this.orgData = res.data;
    });

    this.dashboardService
      .getOrgPopulatTopicsData()
      .subscribe((response: any) => {
        this.orgPopularTopicData = response.data;
      });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
