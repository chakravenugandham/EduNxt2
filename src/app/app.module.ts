import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TimeFrameComponent } from './time-frame/time-frame.component';
import { LdDashboardComponent } from './ld-dashboard/ld-dashboard.component';
import { ActiveUsersComponentComponent } from './active-users-component/active-users-component.component';
import { LearnerEngagementComponentComponent } from './learner-engagement-component/learner-engagement-component.component';
import { LearnerPeaceComponentComponent } from './learner-peace-component/learner-peace-component.component';
import { FeedBackComponentComponent } from './feed-back-component/feed-back-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TimeFrameComponent,
    LdDashboardComponent,
    ActiveUsersComponentComponent,
    LearnerEngagementComponentComponent,
    LearnerPeaceComponentComponent,
    FeedBackComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
