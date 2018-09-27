import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LocationComponent } from './location.component';
import { GoogleChartsBaseService } from "../../services/googleChartService";
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';


describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationComponent, SpinnerComponent],
      providers: [GoogleChartsBaseService, LdDashboardService, CookieService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    component.responseData = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should create', () => {
    component.getLocationData();
    expect(component.getLocationData).toBeDefined();
  });
});
