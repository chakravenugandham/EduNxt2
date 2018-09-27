import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { FilterWidgetComponent } from './filter-widget.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterWidgetComponent],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([]), FontAwesomeModule, ClickOutsideModule, NgbModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should define showFilter', () => {
    let filtersInfo = {
      'filterList': []
    };
    component.showFilter();
    expect(component.showFilter).toBeDefined();
  });

  xit('should define selectFilter', () => {
    let filtersInfo = {
      'appliedFilters': []
    };
    component.selectFilter(filter, filterName);
    expect(component.selectFilter).toBeDefined();
  });

  // xit('should define showFilter', () => {
  //   component.selectFilter(filter, filterName);
  //   expect(!component.filterArray.includes(filterName.name)).toEqual(component.filterArray.push(filterName.name));
  // });

  it('should define closeDropDown', () => {
    component.closeDropDown();
    expect(component.closeDropDown).toBeDefined();
  });

  // it('should define showFilter', () => {
  //   let filterBodyName, index;
  //   component.removeFromFilterBody(filterBodyName, index);
  //   expect(component.removeFromFilterBody).toBeDefined();
  // });

});




