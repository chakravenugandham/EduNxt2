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

  ngOnInit() {
    this.activeConfig = {
      peopleCurrentlyEnrolled: 23,
      usersSinceLastMonth: 30,
      Users: "string",
      sinceLastMonth: "string",
      PeopleAreCurrentlyEnrolled: "string"
    }
    this.enrolledConfig = {
      peopleCurrentlyEnrolled: 43,
      usersSinceLastMonth: 50,
      Users: "string",
      sinceLastMonth: "string",
      PeopleAreCurrentlyEnrolled: "string"
    }
  }

}
