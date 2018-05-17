import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TimeFrameComponent } from './time-frame/time-frame.component';
import { LdDashboardComponent } from './ld-dashboard/ld-dashboard.component';
import { LearningActivityWidgetComponent } from './ld-dashboard/learning-activity-widget/learning-activity-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TimeFrameComponent,
    LdDashboardComponent,
    LearningActivityWidgetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
