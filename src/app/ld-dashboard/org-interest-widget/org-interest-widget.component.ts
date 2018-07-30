import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-org-interest-widget",
  templateUrl: "./org-interest-widget.component.html",
  styleUrls: ["./org-interest-widget.component.scss"]
})
export class OrgInterestWidgetComponent implements OnInit, OnChanges {
  routePath: string = "orgInterestFullView";
  filtersData = {
    routeTo: "orgInterestFullView",
    filters: false,
    search: false,
    viewDetails: false,
    filterList: []
  };

  searchFilterData = {
    searchComponent: "organization-interests",
    searchBy: "courseName"
  };
  orgData = {};
  filterbody = {};

  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getFilterObject($event) {
    this.filterbody = $event;
  }

  getDataFromService() {
    //this.options.width = document.getElementById("word-cloud").offsetWidth;
    this.getData.getOrgInterestData().subscribe((res: any) => {
      this.orgData = res.data;
      console.log(this.orgData);
      //this.wordData = [];
      // for (let i = 0; i < this.orgData["popularTopicsData"].length; i++) {
      //   //let wordWeight = Math.floor(Math.random() * 3 + 1);
      //   this.wordData.push({
      //     text: this.orgData["popularTopicsData"][i].courseName,
      //     weight: this.orgData["popularTopicsData"][i].rank
      //   });
      // }
      // const myObservable: Observable<CloudData[]> = observableOf(this.wordData);
      // myObservable.subscribe(res => (this.data = res));
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }

  ngOnChanges(changes: SimpleChanges) {}
}
