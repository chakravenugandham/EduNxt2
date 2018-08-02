import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";


import { ActiveUserWidgetComponent } from './active-user-widget.component';
import { LdDashboardService } from "../services/ld-dashboard.service";
import { ActiveUsersComponent } from "./active-users/active-users.component";
import { LocationComponent } from "./location/location.component";
import { ModeOfDeliveryComponent } from "./mode-of-delivery/mode-of-delivery.component";
import { FilterWidgetComponent } from "../common/filter-widget/filter-widget.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('ActiveUserWidgetComponent', () => {
  let component: ActiveUserWidgetComponent;
  let fixture: ComponentFixture<ActiveUserWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveUserWidgetComponent, ActiveUsersComponent, LocationComponent,
        ModeOfDeliveryComponent, FilterWidgetComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
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
});
