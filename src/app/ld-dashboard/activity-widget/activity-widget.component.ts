import { Component, OnInit } from '@angular/core';
import { observable } from "rxjs";

import { ActivityService } from "../services/activity.service";

@Component({
  selector: 'app-activity-widget',
  templateUrl: './activity-widget.component.html',
  styleUrls: ['./activity-widget.component.css']
})
export class ActivityWidgetComponent implements OnInit {

  constructor(private getData: ActivityService) { }

  activeUsers = [];
  learnerEngagement = [];
  learnerPace = [];
  feedback = [];

  //activeUsers = [{activeUsers:567,changeInUsers:356,peopleCurrentlyEnrolled:23,usersSinceLastMonth:32}];

  getDataFromService(){
    this.getData.getActivityData()
    .subscribe((respose:any) => {
      //this.activeUsers = respose.data.activeUsers;
      this.activeUsers.push(respose.data.activeUsers);
      this.learnerEngagement.push(respose.data.learnerEngagement);
      this.learnerPace.push(respose.data.learnerPace);
      this.feedback.push(respose.data.feedback);
      console.log("respose", respose.data);
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }

}