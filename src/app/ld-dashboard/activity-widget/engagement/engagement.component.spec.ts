import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { EngagementComponent } from './engagement.component';
import { Config, UsersDataComponent } from '../../../common/users-data/users-data.component';
import { HalfdonutchartDirective } from '../../../directives/halfdonutchart.directive';
import { SpinnerComponent } from '../../../common/spinner/spinner.component';
import { CustomNumberPipe } from '../../../../app/shared/custom-number.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


describe('EngagementComponent', () => {
  let component: EngagementComponent;
  let fixture: ComponentFixture<EngagementComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementComponent, HalfdonutchartDirective, UsersDataComponent, SpinnerComponent, CustomNumberPipe],
      providers: [CookieService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementComponent);
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
