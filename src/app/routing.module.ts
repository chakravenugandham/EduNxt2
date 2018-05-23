import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LdDashboardComponent } from "./ld-dashboard/ld-dashboard.component";
import { LearnerTrackFullviewComponent } from "./ld-dashboard/fullviews/learner-track-fullview/learner-track-fullview.component";

const routes: Routes = [
  { path: "", component: LdDashboardComponent },
  { path: "learnerTrackFullView", component: LearnerTrackFullviewComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
