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

  learnerPerformacneProgressData = [
    {
      courseName: "Communication 101",
      startDate: "Jan 1, 2018",
      endDate: "Jun 1, 2018",
      facultyName: "Mahinder Singh",
      studentsCount: "200",
      programStatus: "On track",
      completion: "56",
      testScore: "73",
      highestScore: "83"
    },
    {
      courseName: "Communication 101",
      startDate: "Jan 1, 2018",
      endDate: "Jun 1, 2018",
      facultyName: "Mahinder Singh",
      studentsCount: "200",
      programStatus: "On track",
      completion: "56",
      testScore: "73",
      highestScore: "83"
    },
    {
      courseName: "Communication 101",
      startDate: "Jan 1, 2018",
      endDate: "Jun 1, 2018",
      facultyName: "Mahinder Singh",
      studentsCount: "200",
      programStatus: "On track",
      completion: "56",
      testScore: "73",
      highestScore: "83"
    },
    {
      courseName: "Communication 101",
      startDate: "Jan 1, 2018",
      endDate: "Jun 1, 2018",
      facultyName: "Mahinder Singh",
      studentsCount: "200",
      programStatus: "On track",
      completion: "56",
      testScore: "73",
      highestScore: "83"
    },
    {
      courseName: "Communication 101",
      startDate: "Jan 1, 2018",
      endDate: "Jun 1, 2018",
      facultyName: "Mahinder Singh",
      studentsCount: "200",
      programStatus: "On track",
      completion: "56",
      testScore: "73",
      highestScore: "83"
    },
  ]
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
