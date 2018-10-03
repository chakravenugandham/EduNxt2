import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackComponent } from './feedback.component';
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { SpinnerComponent } from "../../../common/spinner/spinner.component";
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackComponent, SpinnerComponent, CustomNumberPipe],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
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
