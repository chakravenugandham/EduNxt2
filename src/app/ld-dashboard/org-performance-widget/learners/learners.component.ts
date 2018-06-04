import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-learners",
  templateUrl: "./learners.component.html",
  styleUrls: ["./learners.component.scss"]
})
export class LearnersComponent implements OnInit {
  LearnersData = [];
  constructor(private getData: LdDashboardService) {}
  getDataFromService() {
    this.getData.getLearnerData().subscribe((res: any) => {
      this.LearnersData = res.data;
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
