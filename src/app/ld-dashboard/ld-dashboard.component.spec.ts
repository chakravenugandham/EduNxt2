import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChartDirective } from "../directives/bar-chart.directive";
import { DonutChartDirective } from "../directives/donut-chart.directive";
import { HalfdonutchartDirective } from "../directives/halfdonutchart.directive";
import { ScoreChartDirective } from "../directives/score-chart.directive";
import { ActivityWidgetComponent } from "../ld-dashboard/activity-widget/activity-widget.component";
import { EngagementComponent } from "../ld-dashboard/activity-widget/engagement/engagement.component";
import { FeedbackComponent } from "../ld-dashboard/activity-widget/feedback/feedback.component";
import { PaceComponent } from "../ld-dashboard/activity-widget/pace/pace.component";
import { TimespentComponent } from "../ld-dashboard/activity-widget/timespent/timespent.component";
import { UsersComponent } from "../ld-dashboard/activity-widget/users/users.component";
import { UserstrainedComponent } from "../ld-dashboard/activity-widget/userstrained/userstrained.component";
import { HeaderComponent } from "../common/header/header.component";
import { TimeFrameComponent } from "../common/time-frame/time-frame.component";
import { ActiveUserWidgetComponent } from '../ld-dashboard/active-user-widget/active-user-widget.component';
import { ActiveUsersComponent } from '../ld-dashboard/active-user-widget/active-users/active-users.component';
import { ModeOfDeliveryComponent } from '../ld-dashboard/active-user-widget/mode-of-delivery/mode-of-delivery.component';
import { LocationComponent } from '../ld-dashboard/active-user-widget/location/location.component';
import { LearnersTrackWidgetComponent } from '../ld-dashboard/learners-track-widget/learners-track-widget.component';
import { LearnerPaceComponent } from '../ld-dashboard/learners-track-widget/learner-pace/learner-pace.component';
import { LearnerPerformanceComponent } from '../ld-dashboard/learners-track-widget/learner-performance/learner-performance.component';
import { LearnersPerformanceWidgetComponent } from '../ld-dashboard/learners-performance-widget/learners-performance-widget.component';
import { PerformanceComponent } from '../ld-dashboard/learners-performance-widget/performance/performance.component';
import { ProgressComponent } from '../ld-dashboard/learners-performance-widget/progress/progress.component';
import { ScoresDistributionWidgetComponent } from '../ld-dashboard/scores-distribution-widget/scores-distribution-widget.component';
import { TestScoresComponent } from '../ld-dashboard/scores-distribution-widget/test-scores/test-scores.component';
import { QuizComponent } from '../ld-dashboard/scores-distribution-widget/quiz/quiz.component';
import { AssignmentComponent } from '../ld-dashboard/scores-distribution-widget/assignment/assignment.component';
import { OrgPerformanceWidgetComponent } from '../ld-dashboard/org-performance-widget/org-performance-widget.component';
import { TeamsComponent } from '../ld-dashboard/org-performance-widget/teams/teams.component';
import { TrainersComponent } from '../ld-dashboard/org-performance-widget/trainers/trainers.component';
import { LearnersComponent } from '../ld-dashboard/org-performance-widget/learners/learners.component';
import { ContentPerformanceWidgetComponent } from '../ld-dashboard/content-performance-widget/content-performance-widget.component';
import { ContentConsumptionComponent } from '../ld-dashboard/content-performance-widget/content-consumption/content-consumption.component';
import { NotificationPerformanceWidgetComponent } from '../ld-dashboard/notification-performance-widget/notification-performance-widget.component';
import { ScheduledDeliveredComponent } from '../ld-dashboard/notification-performance-widget/scheduled-delivered/scheduled-delivered.component';
import { SeenRespondedComponent } from '../ld-dashboard/notification-performance-widget/seen-responded/seen-responded.component';
import { OrgInterestWidgetComponent } from '../ld-dashboard/org-interest-widget/org-interest-widget.component';
import { OrgInterestComponent } from '../ld-dashboard/org-interest-widget/org-interest/org-interest.component';
import { AttentionNeedWidgetComponent } from '../ld-dashboard/attention-need-widget/attention-need-widget.component';
import { LearnerTrackFullviewComponent } from '../ld-dashboard/fullviews/learner-track-fullview/learner-track-fullview.component';
import { MpDatepickerRangeComponent } from '../common/mp-datepicker-range/mp-datepicker-range.component';
import { ContentConsumptionFullviewComponent } from '../ld-dashboard/fullviews/content-consumption-fullview/content-consumption-fullview.component';
import { FooterComponent } from '../common/footer/footer.component';
import { FilterWidgetComponent } from '../common/filter-widget/filter-widget.component';
import { LearnerPerformanceFullviewComponent } from '../ld-dashboard/fullviews/learner-performance-fullview/learner-performance-fullview.component';
import { ScoresDistributionFullviewComponent } from '../ld-dashboard/fullviews/scores-distribution-fullview/scores-distribution-fullview.component';
import { OrgPerformanceFullviewComponent } from '../ld-dashboard/fullviews/org-performance-fullview/org-performance-fullview.component';
import { NotificationPerformanceFullviewComponent } from '../ld-dashboard/fullviews/notification-performance-fullview/notification-performance-fullview.component';
import { OrgInterestFullviewComponent } from '../ld-dashboard/fullviews/org-interest-fullview/org-interest-fullview.component';
// import { GoogleChartsBaseService } from "../ld-dashboard/services/googleChartService";
import { UsersDataComponent, Config } from '../common/users-data/users-data.component';
import { LdDashboardService } from "./services/ld-dashboard.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TagCloudComponent } from "angular-tag-cloud-module";
import { SpinnerComponent } from '../common/spinner/spinner.component';
import { CustomNumberPipe } from "../../app/shared/custom-number.pipe";
import { PaginateComponent } from '../common/paginate/paginate.component';
import { CookieService } from 'ngx-cookie-service';
import { ClickOutsideModule } from 'ng4-click-outside';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextTransformPipe } from '../../app/shared/text-transform.pipe';
import { DaterangePickerComponent } from "ng2-daterangepicker";
import { GraphChartComponent } from '../common/graph-chart/graph-chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LdDashboardComponent } from './ld-dashboard.component';

describe('LdDashboardComponent', () => {
  let component: LdDashboardComponent;
  let fixture: ComponentFixture<LdDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LdDashboardComponent,
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
        TagCloudComponent,
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
        Config,
        HalfdonutchartDirective,
        DonutChartDirective,
        BarChartDirective,
        ScoreChartDirective,
        SpinnerComponent,
        CustomNumberPipe,
        PaginateComponent,
        TextTransformPipe, DaterangePickerComponent,
        GraphChartComponent
      ],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([]), ClickOutsideModule, NgbModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
