import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [FormsModule, NgbModule.forRoot(), HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [LdDashboardService, CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create changeCourse', () => {
    let selectTenantName;
    component.changeCourse(selectTenantName);
    expect(component.changeCourse).toBeTruthy();
  });

  xit('should create logout', () => {
    component.logout();
    expect(component.logout).toBeTruthy();
  });

});
