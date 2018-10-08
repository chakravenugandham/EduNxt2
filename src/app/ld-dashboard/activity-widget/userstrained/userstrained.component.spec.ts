import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

import { UserstrainedComponent } from './userstrained.component';
import { HalfdonutchartDirective } from '../../../directives/halfdonutchart.directive';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('UserstrainedComponent', () => {
  let component: UserstrainedComponent;
  let fixture: ComponentFixture<UserstrainedComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserstrainedComponent, HalfdonutchartDirective, SpinnerComponent, CustomNumberPipe],
      providers: [CookieService],
      imports: [HttpClientTestingModule]
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

  it('should create getDataFromService', () => {
    component.getDataFromService();
    expect(component.getDataFromService).toBeTruthy();
  });
});
