import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { TrainersComponent } from './trainers.component';
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterWidgetComponent } from "../../shared/filter-widget/filter-widget.component";


fdescribe('TrainersComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainersComponent, FilterWidgetComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
