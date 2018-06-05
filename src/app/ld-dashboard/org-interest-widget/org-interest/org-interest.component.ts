import { Component, OnInit } from "@angular/core";
import { CloudData, CloudOptions } from "angular-tag-cloud-module";

import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-org-interest",
  templateUrl: "./org-interest.component.html",
  styleUrls: ["./org-interest.component.scss"]
})
export class OrgInterestComponent implements OnInit {
  orgData = {};

  // [
  //   { text: "Management", weight: 2 },
  //   { text: "BlockChain", weight: 1 },
  //   { text: "Consumer", weight: 3 },
  //   { text: "Regulations", weight: 2 },
  //   { text: "UI Design", weight: 1 },
  //   { text: "ADOBE XD", weight: 2 },
  //   { text: "Zeplin", weight: 5 },
  //   { text: "Interactions", weight: 2 },
  //   { text: "SKETCH", weight: 2 }
  // ];
  options: CloudOptions = {
    width: 300,
    height: 200,
    overflow: true
  };

  wordData = [];
  data: CloudData[] = this.wordData;
  constructor(private getData: LdDashboardService) { }

  getDataFromService() {
    this.getData.getOrgInterestData().subscribe((res: any) => {
      this.orgData = res.data;
      for (let i = 0; i < this.orgData['popularTopicsData'].length; i++) {
        this.wordData.push({ 'text': this.orgData['popularTopicsData'][i].courseName, 'weight': 2 })
      }
    });
  }

  ngOnInit() {
    this.getDataFromService();
    console.log("org interest componet", this.orgData);

  }
}
