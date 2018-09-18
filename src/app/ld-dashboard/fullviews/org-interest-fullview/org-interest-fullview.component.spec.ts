import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { OrgInterestFullviewComponent } from './org-interest-fullview.component';
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { PaginateComponent } from "../../../common/paginate/paginate.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('OrgInterestFullviewComponent', () => {
  let component: OrgInterestFullviewComponent;
  let fixture: ComponentFixture<OrgInterestFullviewComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgInterestFullviewComponent, SpinnerComponent, PaginateComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule]
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
});
