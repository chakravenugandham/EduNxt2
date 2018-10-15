import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

import { UsersComponent } from './users.component';
import { Config, UsersDataComponent } from '../../../common/users-data/users-data.component';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, UsersDataComponent, SpinnerComponent, CustomNumberPipe],
      imports: [HttpClientTestingModule],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
