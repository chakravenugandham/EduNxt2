import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPerformanceWidgetComponent } from './content-performance-widget.component';
import { FilterWidgetComponent } from "../shared/filter-widget/filter-widget.component";
import { ContentConsumptionComponent } from "./content-consumption/content-consumption.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('ContentPerformanceComponent', () => {
  let component: ContentPerformanceWidgetComponent;
  let fixture: ComponentFixture<ContentPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentPerformanceWidgetComponent, FilterWidgetComponent, ContentConsumptionComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
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
});
