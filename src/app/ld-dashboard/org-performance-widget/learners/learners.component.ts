import { Component, OnInit, Input } from "@angular/core";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-learners",
  templateUrl: "./learners.component.html",
  styleUrls: ["./learners.component.scss"]
})
export class LearnersComponent implements OnInit {
  @Input() LearnersData;
  // LearnersData = [];
  parseFloat = parseFloat;
  limitTo: number = 5;

  sortOrder: string = "learnerName";

  constructor(private getData: LdDashboardService) {
    // this.getData.refreshAPI.subscribe(result => {
    //   this.getDataFromService();
    // });
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
  }

  // getDataFromService() {
  //   this.getData.getLearnerData(this.limitTo).subscribe((res: any) => {
  //     this.LearnersData = res.data;
  //   });
  // }

  ngOnInit() {
    // this.getDataFromService();
  }
}
