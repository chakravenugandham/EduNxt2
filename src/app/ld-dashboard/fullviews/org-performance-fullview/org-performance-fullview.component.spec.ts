import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { OrgPerformanceFullviewComponent } from './org-performance-fullview.component';
import { LdDashboardService } from '../../services/ld-dashboard.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

fdescribe('OrgPerformanceFullviewComponent', () => {
  let component: OrgPerformanceFullviewComponent;
  let fixture: ComponentFixture<OrgPerformanceFullviewComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgPerformanceFullviewComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPerformanceFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
