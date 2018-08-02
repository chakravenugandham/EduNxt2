import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { TeamsComponent } from './teams.component';
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsComponent, , FilterWidgetComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, , FormsModule, RouterTestingModule.withRoutes([])]
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
});
