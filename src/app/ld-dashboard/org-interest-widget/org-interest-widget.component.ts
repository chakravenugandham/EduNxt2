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
    viewDetails: true,
    filterList: []
  };

  searchFilterData = {
    searchComponent: "organization-interests",
    searchBy: "courseName",
    searchCount: "3"
  };

  filterbody = {};
  orgData: any[];
  orgPopularTopicData: any[];
  actualResponseData: any[];

  searchFilterItem = [];

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.spinner_loader = true;
    this.orgData = [];
    this.dashboardService.getOrgInterestData().subscribe((res: any) => {
      this.orgData = this.actualResponseData = res.data;
      this.spinner_loader = false;
      this.noDataFlag = this.orgData.length == 0 ? true : false;
    });

    this.dashboardService
      .getOrgPopulatTopicsData()
      .subscribe((response: any) => {
        this.orgPopularTopicData = response.data;
      });
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

  ngOnInit() {
    this.getDataFromService();
  }
}
