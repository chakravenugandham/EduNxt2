import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { UserstrainedComponent } from './userstrained.component';
import { HalfdonutchartDirective } from '../../../ld-dashboard/directives/halfdonutchart.directive';

fdescribe('UserstrainedComponent', () => {
  let component: UserstrainedComponent;
  let fixture: ComponentFixture<UserstrainedComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserstrainedComponent, HalfdonutchartDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstrainedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
