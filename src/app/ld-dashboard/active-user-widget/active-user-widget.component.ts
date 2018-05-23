import { Component, OnInit } from '@angular/core';
//import { observable } from "rxjs";
import { Response } from "@angular/http";

import { ActiveUsersService } from "../../ld-dashboard/services/active-users.service";

@Component({
  selector: 'app-active-user-widget',
  templateUrl: './active-user-widget.component.html',
  styleUrls: ['./active-user-widget.component.scss']
})
export class ActiveUserWidgetComponent implements OnInit {

  constructor(private activeService: ActiveUsersService) { }

  activeUser: boolean = true;
  modeDelivery: boolean = false;
  activeUsersFn() {
    this.activeUser = true;
    this.modeDelivery = false;
  }
  modeDeliveryFn() {
    this.activeUser = false;
    this.modeDelivery = true;

  }
  locationFn() {
    this.activeUser = false;
    this.modeDelivery = false;
  }

  resposeData = {
    activeUserData: '',
    locationData: ''
  };
  userInfo = [{
    L_D_UserId: 1,
    CourseId: 1
  }]

  getActiveUsersData() {
    this.activeService.getActiveUsers(this.userInfo)
    .subscribe((respose: Response) => {
      this.resposeData = respose.json();
      //this.resposeData.activeUserData = respose.json().data;
      console.log("respose getActiveUsers", this.resposeData);
    });
  }

  getLocationData() {
    // this.activeService.getLocationData(this.userInfo)
    // .subscribe((respose: any) => {
    //   this.resposeData.locationData = respose.data;
    //   console.log("respose getActiveUsers", this.resposeData.locationData);
    // });
  }
  ngOnInit() {
    this.getActiveUsersData();
    this.getLocationData();
  }
}
