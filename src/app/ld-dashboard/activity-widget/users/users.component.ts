import { Component, OnInit, Input } from '@angular/core';
import { Config } from '../../../common/users-data/users-data.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input('userElement') userData;

  activeConfig: Config;
  enrolledConfig: Config;


  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.userData.currentValue) {
      this.activeConfig = {
        peopleCurrentlyEnrolled: this.userData.activeUsers,
        usersSinceLastMonth: this.userData.changeInUsers,
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People are currently active"
      }
      this.enrolledConfig = {
        peopleCurrentlyEnrolled: this.userData.peopleCurrentlyEnrolled,
        usersSinceLastMonth: this.userData.usersSinceLastMonth,
        Users: "Users",
        sinceLastMonth: "since last month",
        PeopleAreCurrentlyEnrolled: "People are currently enrolled"
      }
    }
  }

  ngOnInit() {

  }

}
