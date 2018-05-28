import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPerformanceFullviewComponent } from './org-performance-fullview.component';

describe('OrgPerformanceFullviewComponent', () => {
  let component: OrgPerformanceFullviewComponent;
  let fixture: ComponentFixture<OrgPerformanceFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPerformanceFullviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPerformanceFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
