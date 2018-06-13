import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPerformanceWidgetComponent } from './org-performance-widget.component';

describe('OrgPerformanceComponent', () => {
  let component: OrgPerformanceWidgetComponent;
  let fixture: ComponentFixture<OrgPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgPerformanceWidgetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPerformanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
