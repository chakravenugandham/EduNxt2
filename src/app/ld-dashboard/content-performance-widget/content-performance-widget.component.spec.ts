import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPerformanceWidgetComponent } from './content-performance-widget.component';
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";
import { ContentConsumptionComponent } from "./content-consumption/content-consumption.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { CustomNumberPipe } from "../../../app/shared/custom-number.pipe";
import { TextTransformPipe } from '../../../app/shared/text-transform.pipe';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ContentPerformanceComponent', () => {
  let component: ContentPerformanceWidgetComponent;
  let fixture: ComponentFixture<ContentPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentPerformanceWidgetComponent, FilterWidgetComponent, ContentConsumptionComponent, SpinnerComponent, CustomNumberPipe, TextTransformPipe],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), FormsModule, ClickOutsideModule, NgbModule.forRoot()],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPerformanceWidgetComponent);
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

  it('should create sortByFn', () => {
    let $event;
    component.sortBy($event);
    expect(component.sortBy).toBeTruthy();
  });

  it('should create addFilters', () => {
    let $event;
    component.addFilters($event);
    expect(component.addFilters).toBeTruthy();
  });

  xit('should create downloadPdf', () => {
    component.downloadPdf();
    expect(component.downloadPdf).toBeTruthy();
  });
});
