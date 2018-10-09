import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LdDashboardService } from "../../ld-dashboard/services/ld-dashboard.service";
import { CookieService } from 'ngx-cookie-service';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])],
      providers: [LdDashboardService, CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create refreshReportFn', () => {
    component.refreshReportFn();
    expect(component.refreshReportFn).toBeTruthy();
  });
});
