import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-learning-activity-widget',
  templateUrl: './learning-activity-widget.component.html',
  styleUrls: ['./learning-activity-widget.component.css']
})
export class LearningActivityWidgetComponent implements OnInit {

  activeUsers: number;
  userChange: number;
  peopleCurrentlyEnrolled: number;
  usersSinceLastMonth: number;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("https://api.myjson.com/bins/o83wu").pipe(map(res => <any>res))
      .subscribe(res => {
        this.activeUsers = res.data.activeUsers.activeUsers;
        this.userChange = res.data.activeUsers.changeInUsers;
        this.peopleCurrentlyEnrolled = res.data.activeUsers.peopleCurrentlyEnrolled;
        this.usersSinceLastMonth = res.data.activeUsers.usersSinceLastMonth;
      });
  }

}
