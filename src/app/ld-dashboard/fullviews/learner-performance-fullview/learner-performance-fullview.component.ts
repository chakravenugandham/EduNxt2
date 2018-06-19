import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-learner-performance-fullview",
  templateUrl: "./learner-performance-fullview.component.html",
  styleUrls: ["./learner-performance-fullview.component.scss"]
})
export class LearnerPerformanceFullviewComponent implements OnInit {
  selectedGraph: string = "performance";
  learnerData = [];

  onchange(componentName) {
    this.selectedGraph = componentName;
  }

  constructor(private contentService: LdDashboardService) { }

  getDataFromService() {
    this.contentService.getLearnerPerformanceDetails().subscribe((res: any) => {
      this.learnerData = res.data;
    });
  }
  ngOnInit() {
    this.getDataFromService();
  }
}
