import { Component } from '@angular/core';

import { HeaderComponent } from "./header/header.component";
import { TimeFrameComponent } from "./time-frame/time-frame.component";
import { LdDashboardComponent } from "./ld-dashboard/ld-dashboard.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
