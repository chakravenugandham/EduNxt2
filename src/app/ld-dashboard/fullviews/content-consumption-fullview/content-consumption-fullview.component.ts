import { Component, OnInit } from "@angular/core";

import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-content-consumption-fullview",
  templateUrl: "./content-consumption-fullview.component.html",
  styleUrls: ["./content-consumption-fullview.component.scss"]
})
export class ContentConsumptionFullviewComponent implements OnInit {
  contentData = [];
  userInfo = [{ L_D_UserId: 1, CourseId: 1 }];

  constructor(private contentService: LdDashboardService) {}

  getDataFromService() {
    console.log("check2");
    this.contentService.getContentData(this.userInfo).subscribe((res: any) => {
      this.contentData = res.data;
      console.log("content consumption data", this.contentData);
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}