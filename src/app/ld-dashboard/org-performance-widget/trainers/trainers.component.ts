import { Component, OnInit, Input } from "@angular/core";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-trainers",
  templateUrl: "./trainers.component.html",
  styleUrls: ["./trainers.component.scss"]
})
export class TrainersComponent implements OnInit {
  @Input() trainersData;
  // trainersData = [];
  sortOrder: string = "trainerName";
  limitTo: number = 5;

  constructor(private getData: LdDashboardService) {
    // this.getData.refreshAPI.subscribe(result => {
    //   this.getDataFromService();
    // });
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
  }

  // getDataFromService() {
  //   this.getData.getTrainersData(this.limitTo).subscribe((res: any) => {
  //     this.trainersData = res.data;
  //   });
  // }

  ngOnInit() {
    // this.getDataFromService();
  }
}
