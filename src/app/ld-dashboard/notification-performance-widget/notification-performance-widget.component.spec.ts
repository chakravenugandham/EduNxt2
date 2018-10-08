import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPerformanceWidgetComponent } from './notification-performance-widget.component';

import { LdDashboardService } from "../services/ld-dashboard.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";
import { BarChartDirective } from "../../directives/bar-chart.directive";
import { ScheduledDeliveredComponent } from "./scheduled-delivered/scheduled-delivered.component";
import { SeenRespondedComponent } from "./seen-responded/seen-responded.component";

import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { CustomNumberPipe } from "../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../app/shared/text-transform.pipe';
import { PaginateComponent } from '../../common/paginate/paginate.component';
import { CookieService } from 'ngx-cookie-service';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('NotificationPerformanceComponent', () => {
  let component: NotificationPerformanceWidgetComponent;
  let fixture: ComponentFixture<NotificationPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationPerformanceWidgetComponent, FilterWidgetComponent, BarChartDirective,
        ScheduledDeliveredComponent, SeenRespondedComponent, SpinnerComponent, CustomNumberPipe, TextTransformPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([]), ClickOutsideModule, NgbModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPerformanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
