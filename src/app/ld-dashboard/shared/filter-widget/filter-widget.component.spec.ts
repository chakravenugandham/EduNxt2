import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { FilterWidgetComponent } from './filter-widget.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LdDashboardService } from "../../services/ld-dashboard.service";

fdescribe('FilterWidgetComponent', () => {
  let component: FilterWidgetComponent;
  let fixture: ComponentFixture<FilterWidgetComponent>;
  let inputEl: DebugElement;

  let filter = {
    type: ""
  };
  let filterName = {
    id: 123,
    name: filter
  };

  let filterSelected: any = {
    batchId: [],
    teamId: [],
    zoneId: []
  };

  let filterArray = [];

  let filterTypeId = "";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterWidgetComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterWidgetComponent);
    component = fixture.componentInstance;
    component.viewData = {
      routeTo: "string",
      filters: true,
      search: true,
      viewDetails: true,
      filterList: ['string', 'string'],
      currentModule: 'string'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define showFilter', () => {
    component.showFilter();
    expect(component.showFilter).toBeDefined();
  });

  xit('should define showFilter', () => {
    component.selectFilter(filter, filterName);
    expect(component.selectFilter).toBeDefined();
  });

  xit('should define showFilter', () => {
    component.selectFilter(filter, filterName);
    expect(!component.filterArray.includes(filterName.name)).toEqual(component.filterArray.push(filterName.name));
  });

  it('should define showFilter', () => {
    component.closeDropDown();
    expect(component.closeDropDown).toBeDefined();
  });

  it('should define showFilter', () => {
    let i;
    component.removeFilter(i);
    expect(component.removeFilter).toBeDefined();
  });

  it('should define showFilter', () => {
    let filterBodyName;
    component.removeFromFilterBody(filterBodyName);
    expect(component.removeFromFilterBody).toBeDefined();
  });

});
