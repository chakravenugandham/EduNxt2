import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresDistributionWidgetComponent } from './scores-distribution-widget.component';

describe('ScoresDistributionWidgetComponent', () => {
  let component: ScoresDistributionWidgetComponent;
  let fixture: ComponentFixture<ScoresDistributionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoresDistributionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresDistributionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
