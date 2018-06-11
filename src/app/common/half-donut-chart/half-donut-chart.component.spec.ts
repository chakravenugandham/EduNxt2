import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfDonutChartComponent } from './half-donut-chart.component';

describe('HalfDonutChartComponent', () => {
  let component: HalfDonutChartComponent;
  let fixture: ComponentFixture<HalfDonutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalfDonutChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
