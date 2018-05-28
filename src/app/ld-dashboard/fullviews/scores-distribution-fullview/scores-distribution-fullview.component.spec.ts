import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresDistributionFullviewComponent } from './scores-distribution-fullview.component';

describe('ScoresDistributionFullviewComponent', () => {
  let component: ScoresDistributionFullviewComponent;
  let fixture: ComponentFixture<ScoresDistributionFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoresDistributionFullviewComponent ]
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
