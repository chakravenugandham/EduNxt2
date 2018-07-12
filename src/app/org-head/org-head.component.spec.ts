import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgHeadComponent } from './org-head.component';

describe('OrgHeadComponent', () => {
  let component: OrgHeadComponent;
  let fixture: ComponentFixture<OrgHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
