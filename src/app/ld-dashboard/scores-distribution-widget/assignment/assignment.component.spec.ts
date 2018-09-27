import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentComponent } from './assignment.component';
import { ScoreChartDirective } from "../../../ld-dashboard/directives/score-chart.directive";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterWidgetComponent } from "../../../common/filter-widget/filter-widget.component";
import { LdDashboardService } from "../../services/ld-dashboard.service";

import { ClickOutsideModule } from 'ng4-click-outside';
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { CookieService } from 'ngx-cookie-service';
import { PaginateComponent } from "../../../common/paginate/paginate.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AssignmentComponent', () => {
  let component: AssignmentComponent;
  let fixture: ComponentFixture<AssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentComponent, ScoreChartDirective, FilterWidgetComponent, SpinnerComponent, CustomNumberPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [HttpClientTestingModule, FormsModule, ClickOutsideModule, NgbModule.forRoot(), RouterModule.forRoot([]), FontAwesomeModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
