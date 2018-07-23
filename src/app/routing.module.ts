import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LdDashboardComponent } from "./ld-dashboard/ld-dashboard.component";
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

const routes: Routes = [
  { path: "", redirectTo: "learner", pathMatch: "full" },
  { path: "LnD", component: LdDashboardComponent },
  { path: "faculty", component: FacultyComponent },
  { path: "orgHead", component: OrgHeadComponent },
  { path: "learner", component: LearnerComponent },
  { path: "learnerTrackFullView", component: LearnerTrackFullviewComponent },
  {
    path: "learnerPerformanceFullView",
    component: LearnerPerformanceFullviewComponent
  },
  {
    path: "scoreDistributionFullView",
    component: ScoresDistributionFullviewComponent
  },
  {
    path: "orgPerformanceFullView",
    component: OrgPerformanceFullviewComponent
  },
  {
    path: "contentConsumptionFullView",
    component: ContentConsumptionFullviewComponent
  },
  {
    path: "notificationPerformanceFullView",
    component: NotificationPerformanceFullviewComponent
  },
  { path: "orgInterestFullView", component: OrgInterestFullviewComponent },
  { path: "learnerQuizFullView", component: LearnersQuizFullviewComponent },
  { path: "bestprogramsfullview", component: BestprogramsfullviewComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class RoutingModule {}
