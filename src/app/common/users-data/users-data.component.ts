import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss']
})

// class Config {
//   usersValue: number;
//   name: string;
//   Value: string;

//   // This allows you to make the call `new Hero(1, 'Flash')` for example
//   constructor(usersValue: number, name: string, Value: string) {
//     this.usersValue = usersValue;
//     this.name = name;
//     this.Value = Value;
//   }
// }
export class UsersDataComponent implements OnInit {

  // @Input() config: Config;

  constructor() { }

  ngOnInit() {
  }

}
