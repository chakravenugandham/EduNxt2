import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { OrgInterestWidgetComponent } from './org-interest-widget.component';
import { OrgInterestComponent } from "./org-interest/org-interest.component";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { CustomNumberPipe } from "../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../app/shared/text-transform.pipe';
import { PaginateComponent } from '../../common/paginate/paginate.component';
import { CookieService } from 'ngx-cookie-service';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagCloudModule } from "angular-tag-cloud-module";
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('OrgInterestWidgetComponent', () => {
  let component: OrgInterestWidgetComponent;
  let fixture: ComponentFixture<OrgInterestWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgInterestWidgetComponent, OrgInterestComponent, FilterWidgetComponent, SpinnerComponent, CustomNumberPipe, TextTransformPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([]), ClickOutsideModule, NgbModule.forRoot(), TagCloudModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgInterestWidgetComponent);
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

  it('should create constructNewArray', () => {
    component.constructNewArray();
    expect(component.constructNewArray).toBeTruthy();
  });

  xit('should create getFilterObject', () => {
    let $event;
    component.getSearchItem($event);
    expect(component.getSearchItem).toBeTruthy();
  });
});
