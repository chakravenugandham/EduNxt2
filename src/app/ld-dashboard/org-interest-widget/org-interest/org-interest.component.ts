import { Component, OnInit } from "@angular/core";
import { CloudData, CloudOptions } from "angular-tag-cloud-module";
import { Observable } from "rxjs";
import { of as observableOf } from "rxjs";

import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-org-interest",
  templateUrl: "./org-interest.component.html",
  styleUrls: ["./org-interest.component.scss"]
})
export class OrgInterestComponent implements OnInit {
  orgData = {};
  options: CloudOptions = {
    width: 300,
    height: 200,
    overflow: false
  };

  wordData = [];
  data: CloudData[];
  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe((result) => {
      this.getDataFromService();
    })
  }

  getDataFromService() {
    this.options.width = document.getElementById("word-cloud").offsetWidth;
    this.getData.getOrgInterestData().subscribe((res: any) => {
      this.orgData = res.data;
      for (let i = 0; i < this.orgData["popularTopicsData"].length; i++) {
        let wordWeight = Math.floor(Math.random() * 3 + 1);
        this.wordData.push({
          text: this.orgData["popularTopicsData"][i].courseName,
          weight: wordWeight
        });
      }
      const myObservable: Observable<CloudData[]> = observableOf(this.wordData);
      myObservable.subscribe(res => (this.data = res));
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
