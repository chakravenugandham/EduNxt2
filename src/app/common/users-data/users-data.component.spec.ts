import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from "../../common/spinner/spinner.component";
import { CustomNumberPipe } from "../../../app/shared/custom-number.pipe";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

import { UsersDataComponent, Config } from './users-data.component';

describe('UsersDataComponent', () => {
  let component: UsersDataComponent;
  let fixture: ComponentFixture<UsersDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersDataComponent, Config, CustomNumberPipe, SpinnerComponent],
      imports: [HttpClientTestingModule],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDataComponent);
    component = fixture.componentInstance;
    component.config;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
