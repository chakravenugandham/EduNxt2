import { Component, OnInit } from "@angular/core";
import { ContentConsumptionService } from "../../../ld-dashboard/services/content-consumption.service";

@Component({
  selector: "app-content-consumption",
  templateUrl: "./content-consumption.component.html",
  styleUrls: ["./content-consumption.component.scss"]
})
export class ContentConsumptionComponent implements OnInit {
  //url = "192.168.239.38:3000/api/v1/content-consumption";
  url = "https://api.myjson.com/bins/tp29m";

  contentData = [];

  userInfo = [{ L_D_UserId: 1, CourseId: 1 }];

  constructor(private contentService: ContentConsumptionService) {}

  getDataFromService() {
    console.log("check2");
    this.contentService.getData(this.userInfo).subscribe((res: any) => {
      this.contentData = res.data;
      console.log("content consumption data", this.contentData);
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
