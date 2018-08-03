import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestScoresComponent } from './test-scores.component';
import { ScoreChartDirective } from "../../../ld-dashboard/directives/score-chart.directive";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";
import { LdDashboardService } from "../../services/ld-dashboard.service";

describe('TestScoresComponent', () => {
  let component: TestScoresComponent;
  let fixture: ComponentFixture<TestScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestScoresComponent, ScoreChartDirective, FilterWidgetComponent],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
