import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { OrgInterestFullviewComponent } from './org-interest-fullview.component';
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { PaginateComponent } from "../../../common/paginate/paginate.component";
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng4-click-outside';
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('OrgInterestFullviewComponent', () => {
  let component: OrgInterestFullviewComponent;
  let fixture: ComponentFixture<OrgInterestFullviewComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgInterestFullviewComponent, SpinnerComponent, CustomNumberPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [HttpClientTestingModule, FormsModule, ClickOutsideModule, NgbModule.forRoot(), RouterModule.forRoot([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgInterestFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create getDisplayObject', () => {
    let $event;
    component.getDisplayObject($event);
    expect(component.getDisplayObject).toBeTruthy();
  });

  it('should create getDataFromService', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeDefined();
  });

  it('should create searchFn', () => {
    component.searchFn();
    expect(component.searchFn).toBeDefined();
  });

  it('should create closeSearchFn', () => {
    component.closeSearchFn();
    expect(component.closeSearchFn).toBeDefined();
  });

  it('should create sortByFn', () => {
    let sortByName = '';
    component.sortByFn(sortByName);
    expect(component.sortByFn).toBeTruthy();
  });

  it('should create gotoPage', () => {
    let $event;
    component.gotoPage($event);
    expect(component.gotoPage).toBeTruthy();
  });

  it('should create searchItem', () => {
    component.searchItem();
    expect(component.searchItem).toBeTruthy();
  });

});
