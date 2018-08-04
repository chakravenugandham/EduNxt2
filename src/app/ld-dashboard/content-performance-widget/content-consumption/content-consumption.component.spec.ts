import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConsumptionComponent } from './content-consumption.component';
import { LdDashboardService } from "../../services/ld-dashboard.service";
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ContentConsumptionComponent', () => {
  let component: ContentConsumptionComponent;
  let fixture: ComponentFixture<ContentConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentConsumptionComponent, FilterWidgetComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
