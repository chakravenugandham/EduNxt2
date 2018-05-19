import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPerformanceComponent } from './org-performance.component';

describe('OrgPerformanceComponent', () => {
  let component: OrgPerformanceComponent;
  let fixture: ComponentFixture<OrgPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
