import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { CloudData, CloudOptions } from "angular-tag-cloud-module";
import { By } from "@angular/platform-browser";

import { OrgInterestComponent } from './org-interest.component';
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";
import { FilterWidgetComponent } from "../../../common/filter-widget/filter-widget.component";
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../../app/shared/text-transform.pipe';
//import { TagCloudComponent } from "angular-tag-cloud-module";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagCloudModule } from "angular-tag-cloud-module";
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('OrgInterestComponent', () => {
  let component: OrgInterestComponent;
  let fixture: ComponentFixture<OrgInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgInterestComponent, FilterWidgetComponent, CustomNumberPipe, TextTransformPipe],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([]), ClickOutsideModule, NgbModule.forRoot(), TagCloudModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
