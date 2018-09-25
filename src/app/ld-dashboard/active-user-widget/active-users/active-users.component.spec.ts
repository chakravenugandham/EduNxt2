import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { ActiveUsersComponent } from './active-users.component';
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

fdescribe('ActiveUsersComponent', () => {
  let component: ActiveUsersComponent;
  let fixture: ComponentFixture<ActiveUsersComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveUsersComponent, SpinnerComponent],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create getActiveUsersData', () => {
    component.getActiveUsersData();
    expect(component.getActiveUsersData).toBeTruthy();
  });
});
