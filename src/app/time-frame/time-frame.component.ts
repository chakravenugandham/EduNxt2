import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from "../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: 'app-time-frame',
  templateUrl: './time-frame.component.html',
  styleUrls: ['./time-frame.component.scss']
})
export class TimeFrameComponent implements OnInit {
  coursesData = [];
  today: Date = new Date();

  getDataFromService() {
    this.getData.getCoursesData().subscribe((res: any) => {
      this.coursesData = res.data;
    })
  }
  constructor(private getData: LdDashboardService) { }

  ngOnInit() {
    this.getDataFromService();
  }

}
