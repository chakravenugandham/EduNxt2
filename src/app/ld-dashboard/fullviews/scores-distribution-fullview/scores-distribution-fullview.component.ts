import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-scores-distribution-fullview",
  templateUrl: "./scores-distribution-fullview.component.html",
  styleUrls: ["./scores-distribution-fullview.component.scss"]
})
export class ScoresDistributionFullviewComponent implements OnInit {

  filtersData = {
    routeTo: "scoreDistributionFullView",
    filters: true,
    search: false,
    viewDetails: false,
    viewDetailsFilters: true,
    filterList: [],
    currentModule: '',
    appliedFilters: []
  };

  moduleName: string;

  responseGraphData = [];
  responseScoreDetails = [];

  dataSet = [[0, 0], [20], [40], [60], [80], [100]];

  sortOrder: string = "scoreAvg";
  order: string = 'desc';

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  spinner_loader_graph: boolean = false;
  noDataFlag_graph: boolean = false;

  searchFilterData = {
    component: "",
    searchBy: "learnerName"
  };
  searchString: string = "";

  pagination = {
    page: 1,
    limitTo: 10,
    total: 0,
    total_pages: 1
  };

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getDataFromService();
      this.getScoreDetails();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getDataFromService();
      this.getScoreDetails();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getDataFromService();
      this.getScoreDetails();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getDataFromService();
      this.getScoreDetails();
    });
  }

  getDataFromService() {
    this.spinner_loader_graph = true;
    this.dashboardService.getScoresDistrubution(this.moduleName, this.filtersData.appliedFilters).subscribe((response: any) => {
      this.responseGraphData = response.data;
      this.spinner_loader_graph = false;

      if (this.responseGraphData.length > 0) {
        for (let i = 1; i <= this.responseGraphData.length; i++) {
          this.dataSet[i][1] = this.responseGraphData[i - 1].numberOfUsers;
        }
        this.dataSet = [...this.dataSet];
      }
      this.noDataFlag_graph = this.responseGraphData.length == 0 ? true : false;
    });
  }

  getScoreDetails() {
    this.spinner_loader = true;
    this.responseScoreDetails = [];
    this.dashboardService.getScoresDetails(this.moduleName, this.searchFilterData, this.searchString, this.filtersData.appliedFilters, this.pagination, this.sortOrder, this.order).subscribe((response: any) => {
      this.responseScoreDetails = response.data;
      this.pagination.total = response.pagination.total;
      this.pagination.total_pages = response.pagination.total_pages;
      this.spinner_loader = false;
      this.noDataFlag = Object.keys(response.data).length == 0 ? true : false;
    });
  }

  setConfigModule() {
    if (this.moduleName == 'test') {
      this, this.filtersData.filterList = ["batch"];
      this.searchFilterData.component = "test"
    }
    else if (this.moduleName == 'quiz') {
      this, this.filtersData.filterList = ["batch", "quiz"];
      this.searchFilterData.component = "quiz"
    }
    else if (this.moduleName == 'assignment') {
      this, this.filtersData.filterList = ["batch", "assignment"];
      this.searchFilterData.component = "assignment"
    }
    this.getDataFromService();
    this.getScoreDetails();
  }



  sortByFn(sortByName) {
    if (this.sortOrder == sortByName) {
      if (this.order == 'asc') {
        this.order = 'desc';
      }
      else if (this.order == 'desc') {
        this.order = 'asc';
      }
    }
    else {
      this.order = 'asc';
    }
    this.sortOrder = sortByName;
    this.getScoreDetails();
  }

  changeModule(module) {
    this.moduleName = module;
    localStorage.setItem('scoreComponent', module);
    this.searchString = "";
    this.pagination.page = 1;
    this.setConfigModule();
  }

  // searchItem($event) {
  //   this.dashboardService
  //     .getSearchFilterComponentData(this.searchFilterData, $event.target.value)
  //     .subscribe((response: any) => {
  //       this.responseScoreDetails = response.data;
  //       this.pagination.total = response.pagination.total;
  //       this.pagination.total_pages = response.pagination.total_pages;
  //       this.spinner_loader = false;
  //       this.noDataFlag = response.data.length == 0 ? true : false;
  //     });
  // }

  gotoPage($event) {
    window.scrollTo(0, 0);
    this.pagination.page = $event;
    this.getScoreDetails();
  }

  searchItem() {
    this.pagination.page = 1;
    this.getScoreDetails();
  }

  addFilters($event) {
    this.filtersData.appliedFilters = $event;
    this.getDataFromService();
    this.getScoreDetails();
  }

  //api call for score details based on component
  ngOnInit() {
    window.scrollTo(0, 0);
    this.moduleName = localStorage.getItem('scoreComponent');
    this.setConfigModule();
  }
}
