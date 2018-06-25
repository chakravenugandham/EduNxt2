import { Component } from '@angular/core';

import { HeaderComponent } from "./ld-dashboard/common/header/header.component";
import { TimeFrameComponent } from "./ld-dashboard/common/time-frame/time-frame.component";
import { LdDashboardComponent } from "./ld-dashboard/ld-dashboard.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
