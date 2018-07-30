import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { CloudData, CloudOptions } from "angular-tag-cloud-module";
import { Observable } from "rxjs";
import { of as observableOf } from "rxjs";

import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-org-interest",
  templateUrl: "./org-interest.component.html",
  styleUrls: ["./org-interest.component.scss"]
})
export class OrgInterestComponent implements OnInit, OnChanges {
  @Input() orgInterestData: any
  @Input() orgPopularData: any;
  //orgData = {};
  options: CloudOptions = {
    width: 300,
    height: 300,
    overflow: true
  };

  wordData = [];
  data: CloudData[];
  constructor(private getData: LdDashboardService) {
  }

  ngOnChanges(changes: any) {
    if (changes.orgPopularData && changes.orgPopularData.currentValue) {
      this.options.width = document.getElementById("word-cloud").offsetWidth;
      this.wordData = [];
      for (let i = 0; i < this.orgPopularData.length; i++) {
        this.wordData.push({
          text: this.orgPopularData[i].courseName,
          weight: this.orgPopularData[i].rank
        });
      }
      const myObservable: Observable<CloudData[]> = observableOf(this.wordData);
      myObservable.subscribe(res => (this.data = res));
    }

  }

  ngOnInit() {
    //this.getDataFromService();
  }
}
