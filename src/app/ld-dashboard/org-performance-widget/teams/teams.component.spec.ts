import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { TeamsComponent } from './teams.component';
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterWidgetComponent } from "../../../common/filter-widget/filter-widget.component";
import { ClickOutsideModule } from 'ng4-click-outside';
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../../app/shared/text-transform.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsComponent, FilterWidgetComponent, CustomNumberPipe, TextTransformPipe],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([]), ClickOutsideModule, NgbModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create sortByFn', () => {
    let sortByName = '';
    component.sortByFn(sortByName);
    expect(component.sortByFn).toBeTruthy();
  });

  it('should create open', () => {
    let content, type, personId;
    component.open(content, type, personId);
    expect(component.open).toBeTruthy();
  });

  it('should create composeEmail', () => {
    let type, personId;
    component.composeEmail(type, personId);
    expect(component.composeEmail).toBeTruthy();
  });

});
