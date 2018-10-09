import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./_guards";
import { AuthComponent } from "./auth";

import { LdDashboardComponent } from "./ld-dashboard/ld-dashboard.component";
import { ContentLayoutComponent } from "./containers/content-layout/content-layout.component";
import { FacultyComponent } from "./faculty/faculty.component";
import { OrgHeadComponent } from "./org-head/org-head.component";
import { LearnerComponent } from "./learner/learner.component";

import { LearnerTrackFullviewComponent } from "./ld-dashboard/fullviews/learner-track-fullview/learner-track-fullview.component";
import { ContentConsumptionFullviewComponent } from "./ld-dashboard/fullviews/content-consumption-fullview/content-consumption-fullview.component";
import { LearnerPerformanceFullviewComponent } from "./ld-dashboard/fullviews/learner-performance-fullview/learner-performance-fullview.component";
import { ScoresDistributionFullviewComponent } from "./ld-dashboard/fullviews/scores-distribution-fullview/scores-distribution-fullview.component";
import { OrgPerformanceFullviewComponent } from "./ld-dashboard/fullviews/org-performance-fullview/org-performance-fullview.component";
import { NotificationPerformanceFullviewComponent } from "./ld-dashboard/fullviews/notification-performance-fullview/notification-performance-fullview.component";
import { OrgInterestFullviewComponent } from "./ld-dashboard/fullviews/org-interest-fullview/org-interest-fullview.component";
import { LearnersQuizFullviewComponent } from "./faculty/fullviews/learners-quiz-fullview/learners-quiz-fullview.component";
import { BestprogramsfullviewComponent } from "./org-head/fullviews/bestprogramsfullview/bestprogramsfullview.component";
import { AppComponent } from "./app.component";

const routes: Routes = [
  { path: '', redirectTo: 'LnD', pathMatch: 'full' },
  { path: "auth", component: AuthComponent },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: "LnD",
        component: LdDashboardComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "faculty",
        component: FacultyComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "orgHead",
        component: OrgHeadComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "learner",
        component: LearnerComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "learnerTrackFullView",
        component: LearnerTrackFullviewComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "learnerPerformanceFullView",
        component: LearnerPerformanceFullviewComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "scoreDistributionFullView",
        component: ScoresDistributionFullviewComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "orgPerformanceFullView",
        component: OrgPerformanceFullviewComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "contentConsumptionFullView",
        component: ContentConsumptionFullviewComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "notificationPerformanceFullView",
        component: NotificationPerformanceFullviewComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "orgInterestFullView",
        component: OrgInterestFullviewComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "learnerQuizFullView",
        component: LearnersQuizFullviewComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "bestprogramsfullview",
        component: BestprogramsfullviewComponent,
        // canActivate: [AuthGuard]
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class RoutingModule { }
