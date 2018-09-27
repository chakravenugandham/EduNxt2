import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";


import { ActiveUserWidgetComponent } from './active-user-widget.component';
import { LdDashboardService } from "../services/ld-dashboard.service";
import { ActiveUsersComponent } from "./active-users/active-users.component";
import { LocationComponent } from "./location/location.component";
import { ModeOfDeliveryComponent } from "./mode-of-delivery/mode-of-delivery.component";
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClickOutsideModule } from 'ng4-click-outside';
import { SpinnerComponent } from "../../common/spinner/spinner.component";
import { FormsModule } from '@angular/forms';
import { CustomNumberPipe } from "../../../app/shared/custom-number.pipe";
import { CookieService } from 'ngx-cookie-service';
import { PaginateComponent } from "../../common/paginate/paginate.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';

fdescribe('ActiveUserWidgetComponent', () => {
  let component: ActiveUserWidgetComponent;
  let fixture: ComponentFixture<ActiveUserWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveUserWidgetComponent, ActiveUsersComponent, LocationComponent,
        ModeOfDeliveryComponent, FilterWidgetComponent, SpinnerComponent, CustomNumberPipe, PaginateComponent],
      providers: [LdDashboardService, CookieService, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [HttpClientTestingModule, FormsModule, ClickOutsideModule, NgbModule.forRoot(), RouterModule.forRoot([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUserWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create getActiveUsersData', () => {
    component.activeUsersFn();
    expect(component.activeUsersFn).toBeTruthy();
  });

  it('should create modeDeliveryFn', () => {
    component.modeDeliveryFn();
    expect(component.modeDeliveryFn).toBeDefined();
  });

  it('should create locationFn', () => {
    component.locationFn();
    expect(component.locationFn).toBeDefined();
  });

  it('should create getFilterObject', () => {
    let $event;
    component.getFilterObject($event);
    expect(component.getFilterObject).toBeDefined();
  });

  xit('should create csvFormatFn', () => {
    component.csvFormatFn();
    expect(component.csvFormatFn).toBeDefined();
  });


});
