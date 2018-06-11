import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss']
})


export class UsersDataComponent implements OnInit {

  @Input() config: Config;

  constructor() { }

  ngOnInit() {
  }

}

export class Config {
  peopleCurrentlyEnrolled: number;
  usersSinceLastMonth: number;
  Users: string;
  sinceLastMonth: string;
  PeopleAreCurrentlyEnrolled: string;
}
