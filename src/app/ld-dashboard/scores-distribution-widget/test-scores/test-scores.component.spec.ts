import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestScoresComponent } from './test-scores.component';
import { ScoreChartDirective } from "../../../directives/score-chart.directive";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { FilterWidgetComponent } from "../../../common/filter-widget/filter-widget.component";
import { LdDashboardService } from "../../services/ld-dashboard.service";

import { ClickOutsideModule } from 'ng4-click-outside';
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../../app/shared/text-transform.pipe';
import { CookieService } from 'ngx-cookie-service';
import { PaginateComponent } from "../../../common/paginate/paginate.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('TestScoresComponent', () => {
  let component: TestScoresComponent;
  let fixture: ComponentFixture<TestScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestScoresComponent, ScoreChartDirective, FilterWidgetComponent, SpinnerComponent, CustomNumberPipe, TextTransformPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [HttpClientTestingModule, FormsModule, ClickOutsideModule, NgbModule.forRoot(), RouterModule.forRoot([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
