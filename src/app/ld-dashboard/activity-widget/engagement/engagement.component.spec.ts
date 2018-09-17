import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { EngagementComponent } from './engagement.component';
import { Config, UsersDataComponent } from '../../../ld-dashboard/common/users-data/users-data.component';
import { HalfdonutchartDirective } from '../../../ld-dashboard/directives/halfdonutchart.directive';


fdescribe('EngagementComponent', () => {
  let component: EngagementComponent;
  let fixture: ComponentFixture<EngagementComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementComponent, HalfdonutchartDirective, UsersDataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
