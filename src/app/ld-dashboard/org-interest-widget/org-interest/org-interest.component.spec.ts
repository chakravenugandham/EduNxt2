import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { CloudData, CloudOptions } from "angular-tag-cloud-module";
import { By } from "@angular/platform-browser";

import { OrgInterestComponent } from './org-interest.component';
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";
import { FilterWidgetComponent } from "../../shared/filter-widget/filter-widget.component";
import { TagCloudComponent } from "angular-tag-cloud-module";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


fdescribe('OrgInterestComponent', () => {
  let component: OrgInterestComponent;
  let fixture: ComponentFixture<OrgInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgInterestComponent, FilterWidgetComponent, TagCloudComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
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

  it('should create getDataFromService', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeTruthy();
  });


});
