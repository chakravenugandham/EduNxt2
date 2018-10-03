import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConsumptionComponent } from './content-consumption.component';
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { FilterWidgetComponent } from "../../../common/filter-widget/filter-widget.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomNumberPipe } from "../../../../app/shared/custom-number.pipe";
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ContentConsumptionComponent', () => {
  let component: ContentConsumptionComponent;
  let fixture: ComponentFixture<ContentConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentConsumptionComponent, FilterWidgetComponent, CustomNumberPipe],
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule, FormsModule, ClickOutsideModule, NgbModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should create sortByFn', () => {
    let sortByName = '';
    component.sortByFn(sortByName);
    expect(component.sortByFn).toBeTruthy();
  });

});
