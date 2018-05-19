import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgInterestComponent } from './org-interest.component';

describe('OrgInterestComponent', () => {
  let component: OrgInterestComponent;
  let fixture: ComponentFixture<OrgInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
