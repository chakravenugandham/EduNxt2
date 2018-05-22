import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-user-widget',
  templateUrl: './active-user-widget.component.html',
  styleUrls: ['./active-user-widget.component.scss']
})
export class ActiveUserWidgetComponent implements OnInit {

  activeUser: boolean = true;
  modeDelivery: boolean = false;
  activeUsersFn(){
    this.activeUser = true;
    this.modeDelivery = false;
  }
  modeDeliveryFn(){
    this.activeUser = false;
    this.modeDelivery = true;

  }
  locationFn(){
    this.activeUser = false;
    this.modeDelivery = false;
  }
  constructor() { }

  ngOnInit() {
  }

}
