import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LdDashboardComponent } from "./ld-dashboard/ld-dashboard.component";
import { LearnerTrackFullviewComponent } from "./ld-dashboard/fullviews/learner-track-fullview/learner-track-fullview.component";
import { ContentConsumptionFullviewComponent } from "./ld-dashboard/fullviews/content-consumption-fullview/content-consumption-fullview.component";

const routes: Routes = [
  { path: "", component: LdDashboardComponent },
  { path: "learnerTrackFullView", component: LearnerTrackFullviewComponent },
  { path: "contentConsumptionFullView", component: ContentConsumptionFullviewComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
