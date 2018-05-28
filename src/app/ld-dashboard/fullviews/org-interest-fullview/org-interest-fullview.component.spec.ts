import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgInterestFullviewComponent } from './org-interest-fullview.component';

describe('OrgInterestFullviewComponent', () => {
  let component: OrgInterestFullviewComponent;
  let fixture: ComponentFixture<OrgInterestFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgInterestFullviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgInterestFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
