import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Daterangepicker } from 'ng2-daterangepicker';

// d3 and nvd3 should be included somewhere
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';

// cookie
import { CookieService } from 'ngx-cookie-service';

// word cloud component
import { TagCloudModule } from 'angular-tag-cloud-module';

// modules
import { RoutingModule } from './routing.module';

// click outside detect
import { ClickOutsideModule } from 'ng4-click-outside';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth';
import { ContentLayoutComponent } from './containers/content-layout/content-layout.component';
import { HeaderComponent } from './common/header/header.component';
import { TimeFrameComponent } from './common/time-frame/time-frame.component';
import { LdDashboardComponent } from './ld-dashboard/ld-dashboard.component';
import { ActivityWidgetComponent } from './ld-dashboard/activity-widget/activity-widget.component';
import { UsersComponent } from './ld-dashboard/activity-widget/users/users.component';
import { EngagementComponent } from './ld-dashboard/activity-widget/engagement/engagement.component';
import { PaceComponent } from './ld-dashboard/activity-widget/pace/pace.component';
import { FeedbackComponent } from './ld-dashboard/activity-widget/feedback/feedback.component';
import { ActiveUserWidgetComponent } from './ld-dashboard/active-user-widget/active-user-widget.component';
import { ActiveUsersComponent } from './ld-dashboard/active-user-widget/active-users/active-users.component';
import { ModeOfDeliveryComponent } from './ld-dashboard/active-user-widget/mode-of-delivery/mode-of-delivery.component';
import { LocationComponent } from './ld-dashboard/active-user-widget/location/location.component';
import { LearnersTrackWidgetComponent } from './ld-dashboard/learners-track-widget/learners-track-widget.component';
import { LearnerPaceComponent } from './ld-dashboard/learners-track-widget/learner-pace/learner-pace.component';
import { LearnerPerformanceComponent } from './ld-dashboard/learners-track-widget/learner-performance/learner-performance.component';
import { LearnersPerformanceWidgetComponent } from './ld-dashboard/learners-performance-widget/learners-performance-widget.component';
import { PerformanceComponent } from './ld-dashboard/learners-performance-widget/performance/performance.component';
import { ProgressComponent } from './ld-dashboard/learners-performance-widget/progress/progress.component';
import { ScoresDistributionWidgetComponent } from './ld-dashboard/scores-distribution-widget/scores-distribution-widget.component';
import { TestScoresComponent } from './ld-dashboard/scores-distribution-widget/test-scores/test-scores.component';
import { QuizComponent } from './ld-dashboard/scores-distribution-widget/quiz/quiz.component';
import { AssignmentComponent } from './ld-dashboard/scores-distribution-widget/assignment/assignment.component';
import { OrgPerformanceWidgetComponent } from './ld-dashboard/org-performance-widget/org-performance-widget.component';
import { TeamsComponent } from './ld-dashboard/org-performance-widget/teams/teams.component';
import { TrainersComponent } from './ld-dashboard/org-performance-widget/trainers/trainers.component';
import { LearnersComponent } from './ld-dashboard/org-performance-widget/learners/learners.component';
import { ContentPerformanceWidgetComponent } from './ld-dashboard/content-performance-widget/content-performance-widget.component';
import { ContentConsumptionComponent } from './ld-dashboard/content-performance-widget/content-consumption/content-consumption.component';
import { NotificationPerformanceWidgetComponent } from './ld-dashboard/notification-performance-widget/notification-performance-widget.component';
import { ScheduledDeliveredComponent } from './ld-dashboard/notification-performance-widget/scheduled-delivered/scheduled-delivered.component';
import { SeenRespondedComponent } from './ld-dashboard/notification-performance-widget/seen-responded/seen-responded.component';
import { OrgInterestWidgetComponent } from './ld-dashboard/org-interest-widget/org-interest-widget.component';
import { OrgInterestComponent } from './ld-dashboard/org-interest-widget/org-interest/org-interest.component';
import { AttentionNeedWidgetComponent } from './ld-dashboard/attention-need-widget/attention-need-widget.component';
import { LearnerTrackFullviewComponent } from './ld-dashboard/fullviews/learner-track-fullview/learner-track-fullview.component';
import { MpDatepickerRangeComponent } from './common/mp-datepicker-range/mp-datepicker-range.component';
import { ContentConsumptionFullviewComponent } from './ld-dashboard/fullviews/content-consumption-fullview/content-consumption-fullview.component';
import { FooterComponent } from './common/footer/footer.component';
import { TimespentComponent } from './ld-dashboard/activity-widget/timespent/timespent.component';
import { UserstrainedComponent } from './ld-dashboard/activity-widget/userstrained/userstrained.component';
import { FilterWidgetComponent } from './common/filter-widget/filter-widget.component';
import { LearnerPerformanceFullviewComponent } from './ld-dashboard/fullviews/learner-performance-fullview/learner-performance-fullview.component';
import { ScoresDistributionFullviewComponent } from './ld-dashboard/fullviews/scores-distribution-fullview/scores-distribution-fullview.component';
import { OrgPerformanceFullviewComponent } from './ld-dashboard/fullviews/org-performance-fullview/org-performance-fullview.component';
import { NotificationPerformanceFullviewComponent } from './ld-dashboard/fullviews/notification-performance-fullview/notification-performance-fullview.component';
import { OrgInterestFullviewComponent } from './ld-dashboard/fullviews/org-interest-fullview/org-interest-fullview.component';
import { GoogleChartsBaseService } from './ld-dashboard/services/googleChartService';
import { UsersDataComponent } from './common/users-data/users-data.component';
import { HalfdonutchartDirective } from './directives/halfdonutchart.directive';
import { DonutChartDirective } from './directives/donut-chart.directive';
import { BarChartDirective } from './directives/bar-chart.directive';
import { ScoreChartDirective } from './directives/score-chart.directive';
import { BestProgramsWidgetComponent } from './org-head/best-programs-widget/best-programs-widget.component';
import { ProgramsComponent } from './org-head/best-programs-widget/programs/programs.component';
import { TrackofgoalsComponent } from './org-head/trackofgoals/trackofgoals.component';
import { GoalsComponent } from './org-head/trackofgoals/goals/goals.component';
import { GoalcardsComponent } from './org-head/common/goalcards/goalcards.component';
import { FacultyperformanceComponent } from './faculty/facultyactivitywidget/facultyperformance/facultyperformance.component';
import { FacultylearnerprogressComponent } from './faculty/facultyactivitywidget/facultylearnerprogress/facultylearnerprogress.component';
import { OutliersComponent } from './faculty/facultyactivitywidget/outliers/outliers.component';
import { LearnersquizComponent } from './faculty/learnersquiz/learnersquiz.component';
import { QuizoverviewComponent } from './faculty/learnersquiz/quizoverview/quizoverview.component';
import { AssignmentoverviewComponent } from './faculty/learnersquiz/assignmentoverview/assignmentoverview.component';
import { LearnersQuizFullviewComponent } from './faculty/fullviews/learners-quiz-fullview/learners-quiz-fullview.component';
import { FacultyscoredistributionComponent } from './faculty/fullviews/facultyscoredistribution/facultyscoredistribution.component';
import { OrgHeadComponent } from './org-head/org-head.component';
import { FacultyComponent } from './faculty/faculty.component';
import { ProgramcardComponent } from './org-head/common/programcard/programcard.component';
import { ProgramstatusComponent } from './org-head/orgactivitywidget/programstatus/programstatus.component';
import { FacultyactivitywidgetComponent } from './faculty/facultyactivitywidget/facultyactivitywidget.component';
import { OrgactivitywidgetComponent } from './org-head/orgactivitywidget/orgactivitywidget.component';
import { BestprogramsfullviewComponent } from './org-head/fullviews/bestprogramsfullview/bestprogramsfullview.component';
import { CourseinsightComponent } from './faculty/courseinsight/courseinsight.component';
import { CourseInsightWidgetComponent } from './faculty/courseinsight/course-insight-widget/course-insight-widget.component';
import { FacultyAttentionWidgetComponent } from './faculty/faculty-attention-widget/faculty-attention-widget.component';
import { FacultyAttentionWidgetCardComponent } from './faculty/common/faculty-attention-widget-card/faculty-attention-widget-card.component';
import { LearnerComponent } from './learner/learner.component';
import { LearnerActivityWidgetComponent } from './learner/learner-activity-widget/learner-activity-widget.component';
import { LearnerPacerComponent } from './learner/learner-activity-widget/learner-pacer/learner-pacer.component';
import { LearnerProgressComponent } from './learner/learner-activity-widget/learner-progress/learner-progress.component';
import { LearnerTimeSpentComponent } from './learner/learner-activity-widget/learner-time-spent/learner-time-spent.component';
import { LearnerScoreCardComponent } from './learner/learner-activity-widget/learner-score-card/learner-score-card.component';
import { LearnerCoursePerformanceComponent } from './learner/learner-course-performance/learner-course-performance.component';
import { LearnerAvgCoursePerformanceComponent } from './learner/learner-course-performance/learner-avg-course-performance/learner-avg-course-performance.component';
import { CustomNumberPipe } from '../app/shared/custom-number.pipe';
import { PaginateComponent } from './common/paginate/paginate.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphChartComponent } from './common/graph-chart/graph-chart.component';
import { TextTransformPipe } from '../app/shared/text-transform.pipe';
import { FullDonutDirective } from './directives/full-donut.directive';
import { LinegraphComponent } from './common/linegraph/linegraph.component';

import { TokenInterceptor } from './common-services/common.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ContentLayoutComponent,
    HeaderComponent,
    TimeFrameComponent,
    LdDashboardComponent,
    ActivityWidgetComponent,
    UsersComponent,
    EngagementComponent,
    PaceComponent,
    FeedbackComponent,
    ActiveUserWidgetComponent,
    ActiveUsersComponent,
    ModeOfDeliveryComponent,
    LocationComponent,
    LearnersTrackWidgetComponent,
    LearnerPaceComponent,
    LearnerPerformanceComponent,
    LearnersPerformanceWidgetComponent,
    PerformanceComponent,
    ProgressComponent,
    ScoresDistributionWidgetComponent,
    TestScoresComponent,
    QuizComponent,
    AssignmentComponent,
    OrgPerformanceWidgetComponent,
    TeamsComponent,
    TrainersComponent,
    LearnersComponent,
    ContentPerformanceWidgetComponent,
    ContentConsumptionComponent,
    NotificationPerformanceWidgetComponent,
    ScheduledDeliveredComponent,
    SeenRespondedComponent,
    OrgInterestWidgetComponent,
    OrgInterestComponent,
    AttentionNeedWidgetComponent,
    LearnerTrackFullviewComponent,
    MpDatepickerRangeComponent,
    ContentConsumptionFullviewComponent,
    FooterComponent,
    TimespentComponent,
    UserstrainedComponent,
    FilterWidgetComponent,
    LearnerPerformanceFullviewComponent,
    ScoresDistributionFullviewComponent,
    OrgPerformanceFullviewComponent,
    NotificationPerformanceFullviewComponent,
    OrgInterestFullviewComponent,
    UsersDataComponent,
    HalfdonutchartDirective,
    DonutChartDirective,
    BarChartDirective,
    ScoreChartDirective,
    BestProgramsWidgetComponent,
    ProgramsComponent,
    TrackofgoalsComponent,
    GoalsComponent,
    GoalcardsComponent,
    FacultyperformanceComponent,
    FacultylearnerprogressComponent,
    OutliersComponent,
    LearnersquizComponent,
    QuizoverviewComponent,
    AssignmentoverviewComponent,
    LearnersQuizFullviewComponent,
    FacultyscoredistributionComponent,
    OrgHeadComponent,
    FacultyComponent,
    ProgramcardComponent,
    ProgramstatusComponent,
    FacultyactivitywidgetComponent,
    OrgactivitywidgetComponent,
    BestprogramsfullviewComponent,
    CourseinsightComponent,
    CourseInsightWidgetComponent,
    FacultyAttentionWidgetComponent,
    FacultyAttentionWidgetCardComponent,
    LearnerComponent,
    LearnerActivityWidgetComponent,
    LearnerPacerComponent,
    LearnerProgressComponent,
    LearnerTimeSpentComponent,
    LearnerScoreCardComponent,
    LearnerCoursePerformanceComponent,
    LearnerAvgCoursePerformanceComponent,
    CustomNumberPipe,
    PaginateComponent,
    SpinnerComponent,
    GraphChartComponent,
    TextTransformPipe,
    FullDonutDirective,
    LinegraphComponent
  ],
  imports: [
    BrowserModule,
    NvD3Module,
    HttpModule,
    HttpClientModule,
    RoutingModule,
    NgbModule.forRoot(),
    Daterangepicker,
    FormsModule,
    TagCloudModule,
    ClickOutsideModule,
    ReactiveFormsModule
  ],
  providers: [GoogleChartsBaseService, CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
