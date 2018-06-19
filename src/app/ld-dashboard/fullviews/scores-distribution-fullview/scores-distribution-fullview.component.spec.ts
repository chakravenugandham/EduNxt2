import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { ScoresDistributionFullviewComponent } from './scores-distribution-fullview.component';
import { LdDashboardService } from '../../services/ld-dashboard.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoreChartDirective } from "../../../directives/score-chart.directive";

fdescribe('ScoresDistributionFullviewComponent', () => {
  let component: ScoresDistributionFullviewComponent;
  let fixture: ComponentFixture<ScoresDistributionFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoresDistributionFullviewComponent, ScoreChartDirective],
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresDistributionFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
