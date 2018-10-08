import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { ScoresDistributionFullviewComponent } from './scores-distribution-fullview.component';
import { LdDashboardService } from '../../services/ld-dashboard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScoreChartDirective } from "../../../directives/score-chart.directive";
import { CookieService } from 'ngx-cookie-service';
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { FormsModule } from '@angular/forms';
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../../app/shared/text-transform.pipe';
import { PaginateComponent } from "../../../common/paginate/paginate.component";
import { FilterWidgetComponent } from "../../../common/filter-widget/filter-widget.component";
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ScoresDistributionFullviewComponent', () => {
  let component: ScoresDistributionFullviewComponent;
  let fixture: ComponentFixture<ScoresDistributionFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoresDistributionFullviewComponent, ScoreChartDirective, FilterWidgetComponent, PaginateComponent, CustomNumberPipe, TextTransformPipe, SpinnerComponent],
      providers: [LdDashboardService, CookieService, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [HttpClientTestingModule, FormsModule, ClickOutsideModule, NgbModule.forRoot(), RouterModule.forRoot([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresDistributionFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create getDataFromService', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeTruthy();
  });

  it('should create getScoreDetails', () => {
    component.getScoreDetails();
    expect(component.getScoreDetails).toBeTruthy();
  });

  it('should create sortByFn', () => {
    let sortByName = '';
    component.sortByFn(sortByName);
    expect(component.sortByFn).toBeTruthy();
  });

  it('should create changeModule', () => {
    let moduleName = '';
    component.changeModule(moduleName);
    expect(component.changeModule).toBeTruthy();
  });

  it('should create gotoPage', () => {
    let $event;
    component.gotoPage($event);
    expect(component.changeModule).toBeTruthy();
  });

  // it('should create setConfigModule', () => {
  //   component.setConfigModule();
  //   expect(component.setConfigModule).toBeTruthy();
  // });

  // it('should create searchItem', () => {
  //   component.searchItem();
  //   expect(component.searchItem).toBeTruthy();
  // });

  // it('should create addFilters', () => {
  //   let $event;
  //   component.addFilters($event);
  //   expect(component.addFilters).toBeTruthy();
  // });
});
