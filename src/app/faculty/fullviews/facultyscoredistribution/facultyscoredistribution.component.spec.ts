import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyscoredistributionComponent } from './facultyscoredistribution.component';

describe('FacultyscoredistributionComponent', () => {
  let component: FacultyscoredistributionComponent;
  let fixture: ComponentFixture<FacultyscoredistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyscoredistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyscoredistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
