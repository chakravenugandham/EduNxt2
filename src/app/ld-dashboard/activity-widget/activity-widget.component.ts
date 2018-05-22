import { Component, OnInit } from '@angular/core';
import { observable } from "rxjs";

import { ActivityService } from "../services/activity.service";

@Component({
  selector: 'app-activity-widget',
  templateUrl: './activity-widget.component.html',
  styleUrls: ['./activity-widget.component.scss']
})
export class ActivityWidgetComponent implements OnInit {

  constructor(private getData: ActivityService) { }

  resposeData = {
    activeUsers: '',
    learnerEngagement: '',
    learnerPace: '',
    feedback: ''
  };

  getDataFromService() {
    this.getData.getActivityData()
      .subscribe((respose: any) => {
        this.resposeData = respose.data;
        console.log("respose activeUsers", respose.data.activeUsers);
      });
  }

  ngOnInit() {
    this.getDataFromService();
  }

}