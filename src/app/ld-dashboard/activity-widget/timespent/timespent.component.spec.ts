import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

import { TimespentComponent } from './timespent.component';
import { HalfdonutchartDirective } from "../../../directives/halfdonutchart.directive";
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('TimespentComponent', () => {
  let component: TimespentComponent;
  let fixture: ComponentFixture<TimespentComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimespentComponent, HalfdonutchartDirective, SpinnerComponent, CustomNumberPipe],
      providers: [CookieService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimespentComponent);
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
