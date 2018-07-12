import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-trainers",
  templateUrl: "./trainers.component.html",
  styleUrls: ["./trainers.component.scss"]
})
export class TrainersComponent implements OnInit {
  trainersData = [];
  sortOrder: string = "trainerName";

  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
  }

  getDataFromService() {
    this.getData.getTrainersData().subscribe((res: any) => {
      this.trainersData = res.data;
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
