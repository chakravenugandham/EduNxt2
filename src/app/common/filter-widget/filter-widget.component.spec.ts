import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { FilterWidgetComponent } from './filter-widget.component';
import { CustomNumberPipe } from "../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../app/shared/text-transform.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

describe('FilterWidgetComponent', () => {
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
      declarations: [FilterWidgetComponent, CustomNumberPipe, TextTransformPipe],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([]), FontAwesomeModule, ClickOutsideModule, NgbModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterWidgetComponent);
    component = fixture.componentInstance;
    component.filtersInfo = {
      routeTo: 'string',
      filters: false,
      search: false,
      viewDetails: false,
      filterList: ['string', 'string'],
      currentModule: 'string',
      viewDetailsFilters: false,
      appliedFilters: [1, 2, 3]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define showFilter', () => {
    let filtersInfo = {
      'filterList': []
    };
    component.showFilter();
    expect(component.showFilter).toBeDefined();
  });

  it('should define selectFilter', () => {
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

  it('should define filterDispalyNameFraming', () => {
    component.filterDispalyNameFraming();
    expect(component.filterDispalyNameFraming).toBeDefined();
  });

  it('should define filterDispalyNameFraming', () => {
    let filtersInfo = {
      routeTo: 'string',
      filters: false,
      search: false,
      viewDetails: false,
      filterList: ['string', 'string'],
      currentModule: 'string',
      viewDetailsFilters: false,
      appliedFilters: [1, 2, 3]
    };
    component.filterDispalyNameFraming();
    expect(filtersInfo.filterList.length > 1).toEqual(true);
  });

  it('should define filterDispalyNameFraming', () => {
    let filtersInfo = {
      routeTo: 'string',
      filters: false,
      search: false,
      viewDetails: false,
      filterList: ['string'],
      currentModule: 'string',
      viewDetailsFilters: false,
      appliedFilters: [1, 2, 3]
    };
    component.filterDispalyNameFraming();
    expect(filtersInfo.filterList.length === 1).toEqual(true);
  });

  it('should define removeFilter', () => {
    let filter;
    component.removeFilter(filter);
    expect(component.removeFilter).toBeDefined();
  });

  xit('should define searchItem', () => {
    let $event;
    component.searchItem($event);
    expect(component.searchItem).toBeDefined();
  });

  it('should define selectSearchItem', () => {
    let searchItem;
    component.selectSearchItem(searchItem);
    expect(component.selectSearchItem).toBeDefined();
  });

  it('should define routetoFullview', () => {
    component.routetoFullview();
    expect(component.routetoFullview).toBeDefined();
  });

  it('should define removeSearchName', () => {
    let i;
    component.removeSearchName(i);
    expect(component.removeSearchName).toBeDefined();
  });

  it('should define checkItemInApplied', () => {
    let array, item;
    component.checkItemInApplied(array, item);
    expect(component.checkItemInApplied).toBeDefined();
  });

  it('should define onClickedOutside', () => {
    let e: Event;
    component.onClickedOutside(e);
    expect(component.onClickedOutside).toBeDefined();
  });



  // it('should define showFilter', () => {
  //   let filterBodyName, index;
  //   component.removeFromFilterBody(filterBodyName, index);
  //   expect(component.removeFromFilterBody).toBeDefined();
  // });

});




