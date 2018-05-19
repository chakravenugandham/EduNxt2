import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgInterestWidgetComponent } from './org-interest-widget.component';

describe('OrgInterestWidgetComponent', () => {
  let component: OrgInterestWidgetComponent;
  let fixture: ComponentFixture<OrgInterestWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgInterestWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgInterestWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
